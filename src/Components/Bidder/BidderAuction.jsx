import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { findAuctionByAuctionId } from '../../Service/Auction_Service';
import { getPlayersByAuctionId } from '../../Service/Player_Service';
import { fetchTeams } from "../../Service/Team_Service.js";
import { soldPlayer, unsoldPlayer } from "../../Service/Mixed_Service.js";
import toast from "react-hot-toast";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import confetti from 'canvas-confetti';
import Loader from "../Loader/Loader.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const BidderAuction = () => {
    const [BidTeam, setBidTeam] = useState(null);
    const [BidPrice, setBidPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [auctionCId, setAuctionCId] = useState(null);
    const [auction, setAuction] = useState({});
    const [auctionPlayers, setAuctionPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAutoSelectUnsold, setIsAutoSelectUnsold] = useState(true);
    const [auctionCompleted, setAuctionCompleted] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [unsoldPlayers, setUnsoldPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [lastBid, setLastBid] = useState(null);
    const [previousTeam, setPreviousTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await loggedUser();
                if (!user) {
                    toast.error("Please Login First!");
                    navigate("/");
                }
            } catch (e) {
                console.log(e.message);
                toast.error("Please Login First!");
                navigate("/");
            }
        };
        fetchUserData();

        if (window?.location?.hash) {
            const hash = window.location.hash.substring(1);
            try {
                const decodedData = JSON.parse(atob(hash));
                setAuctionCId(decodedData.auctionCId);
            } catch (error) {
                console.error("Error decoding auction ID:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (!auctionCId) return;

        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [teamsResponse, auctionResponse, playersResponse] = await Promise.all([
                    fetchTeams(auctionCId),
                    findAuctionByAuctionId(auctionCId),
                    getPlayersByAuctionId(auctionCId)
                ]);

                // Ensure all players start with "Available" status
                const initializedPlayers = playersResponse.map(player => ({
                    ...player,
                    status: player.status || "Available" // Default to "Available" if not set
                }));

                setTeams(teamsResponse || []);
                setAuction(auctionResponse || {});
                setIsAutoSelectUnsold(auctionResponse.autoSelectUnsold || false);
                setAuctionPlayers(initializedPlayers || []);

                // Check if all players are sold
                const allSold = initializedPlayers.every(player => player.status === "Sold");
                if (allSold) {
                    setAuctionCompleted(true);
                } else if (initializedPlayers?.length > 0) {
                    const firstAvailablePlayer = initializedPlayers.find(player => player.status === "Available");
                    if (firstAvailablePlayer) {
                        setSelectedPlayer(firstAvailablePlayer);
                    } else {
                        toast.error("No available players found.");
                        setAuctionCompleted(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load auction data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [auctionCId]);

    // Update unsold players list
    useEffect(() => {
        const updateUnsoldPlayers = () => {
            const unsold = auctionPlayers.filter(player => player.status === "Available" || player.status === "Unsold");
            setUnsoldPlayers(unsold);
            if (!selectedPlayer && unsold.length > 0 && isAutoSelectUnsold) {
                setSelectedPlayer(unsold[0]);
            }
        };
        updateUnsoldPlayers();
    }, [auctionPlayers, selectedPlayer, isAutoSelectUnsold]);

    // Update bid price when selected player changes
    useEffect(() => {
        if (selectedPlayer) {
            setDisplayPrice(selectedPlayer?.minBid || 0);
            setBidPrice(selectedPlayer?.minBid || 0);
        }
    }, [selectedPlayer]);

    const bidIncreasefunction = (teamName) => {
        if (auctionCompleted) {
            toast.error("Auction is completed!");
            return;
        }

        const teamData = teams.find(team => team.name === teamName);
        if (!teamData) {
            toast.error("Team not found!");
            return;
        }

        if (teamData.pointsAvailable < (BidPrice + auction.bidIncrement)) {
            toast.error(`${teamName} does not have enough points to bid!`);
            return;
        }

        if (!BidTeam) {
            setBidTeam(teamData);
            setLastBid({
                team: { ...teamData },
                previousPrice: 0,
                newPrice: BidPrice
            });
            setDisplayPrice(BidPrice);
            return;
        }

        setBidTeam(teamData);
        setIsAnimating(true);

        const previousBidPrice = BidPrice;
        const newPrice = Math.round(BidPrice) + Math.round(auction.bidIncrement);

        setBidPrice(newPrice);
        setLastBid({
            team: { ...teamData },
            previousPrice: previousBidPrice,
            newPrice: newPrice
        });
        setPreviousTeam(BidTeam);

        let start = BidPrice;
        const end = newPrice;
        const increment = (end - start) / (500 / 16);

        const animate = () => {
            start += increment;
            if (start <= end) {
                setDisplayPrice(Math.round(start));
                requestAnimationFrame(animate);
            } else {
                setDisplayPrice(end);
                setIsAnimating(false);
            }
        };

        requestAnimationFrame(animate);
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return "N/A";
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const triggerFirecracker = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF4500', '#FF69B4', '#00FF00'],
            angle: 90,
            drift: 0.5,
            decay: 0.9,
            scalar: 1.2,
        });
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FF4500', '#00CED1'],
                angle: 90,
            });
        }, 200);
    };

    const handleClickSold = async () => {
        if (auctionCompleted) {
            toast.error("Auction is completed!");
            return;
        }

        if (!BidTeam) {
            toast.error("Please select a team to place a bid!");
            return;
        }

        if (displayPrice < selectedPlayer?.minBid) {
            toast.error("Bidder price is less than the minimum bid!");
            return;
        }

        try {
            await soldPlayer({
                playerId: selectedPlayer?._id,
                teamName: BidTeam?.name,
                SoldFor: displayPrice,
                minBid: auction?.minBid
            });

            const updatedTeams = teams.map(team =>
                team.name === BidTeam?.name
                    ? {
                        ...team,
                        NoOfPlayers: (team.NoOfPlayers || 0) + 1,
                        pointsAvailable: team.pointsAvailable - displayPrice,
                        maxPoints: (team.maxPoints - displayPrice) + (auction.minBid || 0)
                    }
                    : team
            );
            setTeams(updatedTeams);
            setLastBid(null);
            setBidTeam((prev) => ({ ...prev, totalPlayers: (prev?.totalPlayers || 0) + 1 }));

            const updatedPlayers = auctionPlayers.map(player =>
                player._id === selectedPlayer._id ? { ...player, status: "Sold" } : player
            );
            setAuctionPlayers(updatedPlayers);
            setUnsoldPlayers(prev => prev.filter(p => p._id !== selectedPlayer._id));

            triggerFirecracker();

            const allSold = updatedPlayers.every(player => player.status === "Sold");
            if (allSold) {
                setAuctionCompleted(true);
                toast.success("Auction Completed!");
            } else {
                moveToNextPlayer();
            }
        } catch (err) {
            console.error("Error marking player as sold:", err);
            toast.error("Failed to mark player as sold.");
        }
    };

    const moveToNextPlayer = () => {
        if (auctionCompleted) return;

        const currentIndex = auctionPlayers.findIndex(player => player?._id === selectedPlayer?._id);
        let nextPlayerIndex = currentIndex + 1;

        while (nextPlayerIndex < auctionPlayers.length && auctionPlayers[nextPlayerIndex].status !== "Available") {
            nextPlayerIndex++;
        }

        if (nextPlayerIndex < auctionPlayers.length) {
            setSelectedPlayer(auctionPlayers[nextPlayerIndex]);
            setBidPrice(auctionPlayers[nextPlayerIndex]?.minBid || 0);
            setDisplayPrice(auctionPlayers[nextPlayerIndex]?.minBid || 0);
            setBidTeam(null);
            setLastBid(null);
        } else if (isAutoSelectUnsold && unsoldPlayers.length > 0) {
            reBidUnsoldPlayers();
        } else {
            setAuctionCompleted(true);
            toast.success("Auction Completed!");
        }
    };

    const reBidUnsoldPlayers = () => {
        if (unsoldPlayers.length === 0) {
            setAuctionCompleted(true);
            toast.success("Auction Completed!");
            return;
        }

        const nextUnsoldPlayer = unsoldPlayers[0];
        setSelectedPlayer(nextUnsoldPlayer);
        setBidPrice(nextUnsoldPlayer?.minBid || 0);
        setDisplayPrice(nextUnsoldPlayer?.minBid || 0);
        setBidTeam(null);
        setLastBid(null);
    };

    const handleClickUnsold = async () => {
        if (auctionCompleted) {
            toast.error("Auction is completed!");
            return;
        }

        try {
            await unsoldPlayer({ playerId: selectedPlayer?._id });
            const updatedPlayer = { ...selectedPlayer, status: "Unsold" };
            setSelectedPlayer(updatedPlayer);
            setLastBid(null);

            setAuctionPlayers(prev =>
                prev.map(player =>
                    player._id === selectedPlayer._id ? updatedPlayer : player
                )
            );
            setUnsoldPlayers(prev => {
                if (!prev.some(p => p._id === updatedPlayer._id)) {
                    return [...prev, updatedPlayer];
                }
                return prev;
            });

            moveToNextPlayer();
        } catch (e) {
            console.error("Error marking player as unsold:", e);
            toast.error("Failed to mark player as unsold.");
        }
    };

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
        setBidPrice(player?.minBid || 0);
        setDisplayPrice(player?.minBid || 0);
        setIsSearchModalOpen(false);
        setSearchTerm('');
        setLastBid(null);
        setBidTeam(null);
    };

    const filteredUnsoldPlayers = unsoldPlayers.filter(player =>
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUndoBid = () => {
        if (!lastBid || auctionCompleted) {
            toast.error("No bid to undo!");
            return;
        }
        setBidTeam(previousTeam);
        setBidPrice(lastBid.previousPrice);
        setDisplayPrice(lastBid.previousPrice);
        setLastBid(null);
        toast.success(`Bid reverted to ₹${lastBid.previousPrice} by ${previousTeam.name}`);
    };

    const formatAbbreviatedPrice = (price) => {
        if (typeof price !== 'number') return '';

        if (price >= 10000000) {
            return `${(price / 10000000).toFixed(2)} Crores`;
        } else if (price >= 100000) {
            return `${(price / 100000).toFixed(2)} Lakhs`;
        } else if (price >= 1000) {
            return `${(price / 1000).toFixed(2)} Thousands`;
        } else {
            return `${price}`;
        }
    };

    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (auctionCompleted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
                <div className="bg-white/95 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-4">Auction Completed!</h1>
                    <p className="text-gray-600 text-lg mb-6">Congratulations! The auction has concluded successfully.</p>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Final Team Statistics</h2>
                        {teams.map((team, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b py-2">
                                <span className="font-medium">{team.name}</span>
                                <span>Players: {team.NoOfPlayers || 0} | Points Remaining: {team.pointsAvailable}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/my-auction">
                        <button className="px-6 py-3 text-white text-lg font-medium rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                            Return to Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-2 relative">
            <div className="bg-white/95 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-5 p-2 sm:gap-2">
                    {selectedPlayer ? (
                        <div className="flex items-center bg-gray-200 rounded-xl p-2 col-span-1 my-1">
                            <div className="flex flex-col items-center bg-gray-200 rounded-xl">
                                <div className="flex md:flex-col flex-row w-full bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="relative group w-[50%] md:w-full flex justify-start">
                                        <img
                                            src={selectedPlayer?.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                            alt="Profile"
                                            className="w-full h-auto aspect-square rounded-t-2xl rounded-b-2xl shadow-2xl transform transition-transform group-hover:scale-[1.02] object-contain"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-2 rounded-b-2xl backdrop-blur-sm">
                                            <h2 className="text-2xl font-bold text-center text-white">
                                                {selectedPlayer.firstName + " " + selectedPlayer.lastName}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-3">
                                        <p className="text-gray-800 font-medium flex justify-between items-center gap-4 bg-gray-200 rounded-lg px-2">
                                            <span className="text-gray-500">Age</span>
                                            <span className="text-lg">{calculateAge(selectedPlayer?.dateOfBirth)} Years</span>
                                        </p>
                                        <p className="text-gray-800 font-medium flex justify-between items-center gap-4 bg-gray-200 rounded-lg px-2">
                                            <span className="text-gray-500">Role</span>
                                            <span className="text-lg">{selectedPlayer?.sportCatagory}</span>
                                        </p>
                                        <p className="text-gray-800 font-medium flex justify-between items-center gap-4 bg-gray-200 rounded-lg px-2">
                                            <span className="text-gray-500">Base Price</span>
                                            <span className="text-lg">₹{selectedPlayer?.minBid}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <div className="col-span-4 flex flex-col md:flex-row items-center bg-blue-200 rounded-xl p-4">
                        <div className="flex-1 ml-[15vw] flex flex-col items-center justify-center h-full mx-[12vw] mb-4 md:mb-0">
                            <div className="relative">
                                <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-xl transform transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                                    <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 flex items-center justify-center ${isAnimating ? 'animate-spin-slow' : ''}`}>
                                        <div className="flex flex-col items-center">
                                            <span className={`text-white text-3xl md:text-5xl font-bold ${isAnimating ? 'animate-bounce' : ''}`}>
                                                ₹{displayPrice.toLocaleString('en-IN')}
                                            </span>
                                            <span className={`text-white text-sm md:text-base font-light ${isAnimating ? 'animate-bounce' : ''}`}>
                                                {formatAbbreviatedPrice(displayPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-100 px-4 py-1 rounded-full shadow-lg border-2 border-orange-300 whitespace-nowrap">
                                    <span className="text-orange-600 font-bold text-lg">Current Bid</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center bg-white rounded-xl p-2 sm:p-4 w-full md:w-1/3 max-w-[180px] sm:max-w-[240px] md:max-w-xs">
                            <div className="flex flex-col items-center w-full my-1 gap-2 sm:gap-3">
                                <div className="bg-white rounded-full shadow-lg">
                                    <img
                                        src={BidTeam?.photo ? `${BidTeam.photo}` : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                                        alt="Team Logo"
                                        className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full transform transition-transform duration-300 hover:scale-105 object-contain"
                                    />
                                </div>
                                {BidTeam ? (
                                    <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-black text-center truncate">{BidTeam?.name}</h3>
                                ) : (
                                    <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-black text-center">No Team Selected</h3>
                                )}
                            </div>

                            <div className="w-full mt-2 sm:mt-4 md:mt-6">
                                <div className="grid grid-rows-3 gap-1 sm:gap-2 md:gap-4">
                                    <div className="flex justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-1 sm:p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h4 className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium mt-1">Total Players</h4>
                                        {BidTeam ? (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-blue-600">{BidTeam.NoOfPlayers || 0}</p>
                                        ) : (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-gray-600">No Data</p>
                                        )}
                                    </div>
                                    <div className="flex justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-1 sm:p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h4 className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium mt-1">Points Available</h4>
                                        {BidTeam ? (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-purple-600">{BidTeam.pointsAvailable}</p>
                                        ) : (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-gray-600">No Data</p>
                                        )}
                                    </div>
                                    <div className="flex justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-1 sm:p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <h4 className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-medium mt-1">Max Points</h4>
                                        {BidTeam ? (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-orange-600">{BidTeam.maxPoints}</p>
                                        ) : (
                                            <p className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-gray-600">No Data</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between p-2 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100">
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                        <button className="flex-1 sm:flex-none sm:px-2 text-black text-sm sm:text-base font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-black">
                            <Link to="/my-auction">
                                <span className="flex my-2 items-center justify-center gap-2">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                    </svg>
                                    <span className="hidden sm:inline">Home</span>
                                </span>
                            </Link>
                        </button>
                        <button onClick={() => setIsSearchModalOpen(true)} className="flex-1 sm:flex-none sm:px-2 text-black text-sm sm:text-base font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-black">
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                <span className="hidden sm:inline">Search Player</span>
                            </span>
                        </button>
                        <button onClick={handleUndoBid} className="flex-1 sm:flex-none sm:px-2 text-black text-sm sm:text-base font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-black">
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                </svg>
                                <span className="hidden sm:inline">Undo</span>
                            </span>
                        </button>
                        <button onClick={() => moveToNextPlayer()} className="flex-1 sm:flex-none sm:px-2 text-black text-sm sm:text-base font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-black">
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                <span className="hidden sm:inline">New Random Player</span>
                            </span>
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleClickUnsold} className="px-6 py-3 w-32 text-white text-lg font-medium rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300">
                            UNSOLD
                        </button>
                        <button onClick={handleClickSold} className="px-6 py-3 w-32 text-white text-lg font-medium rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300">
                            SOLD
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex flex-wrap items-center justify-center mx-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 mt-2 p-2 gap-2">
                {teams.length > 0 ? (
                    teams.map((team, idx) => (
                        <button
                            key={idx}
                            onClick={() => bidIncreasefunction(team.name)}
                            className="flex-1 sm:flex-none sm:px-2 text-black text-sm sm:text-base font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 border-2 border-black min-h-[3vw] min-w-[10vw]"
                        >
                            <p className="text-lg font-semibold text-[16px]">{team.name}</p>
                        </button>
                    ))
                ) : (
                    <p className="text-gray-600">No teams available</p>
                )}
            </div>

            <Dialog open={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Search Unsold Players</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        margin="dense"
                        variant="outlined"
                    />
                    <Box sx={{ maxHeight: 200, overflowY: 'auto', mt: 2 }}>
                        {filteredUnsoldPlayers.length > 0 ? (
                            filteredUnsoldPlayers.map(player => (
                                <Box
                                    key={player._id}
                                    onClick={() => handlePlayerSelect(player)}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #ddd',
                                        '&:hover': { backgroundColor: '#f0f0f0' }
                                    }}
                                >
                                    <Typography>{player.firstName} {player.lastName}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography color="error">No players found matching `{searchTerm}`</Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSearchModalOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BidderAuction;