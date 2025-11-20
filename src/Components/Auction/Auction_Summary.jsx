import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useEffect, useState } from "react";
import { fetchTeams } from "../../Service/Team_Service.js";
import { findAuctionByAuctionId } from "../../Service/Auction_Service.js";
import { getPlayersByAuctionId } from "../../Service/Player_Service.js";
import toast from "react-hot-toast";

const AuctionSummaryPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("team-list");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [auction, setAuction] = useState({});
    const [auctionPlayers, setAuctionPlayers] = useState([]);

    let auctionCId;
    if (window?.location?.hash) {
        const hash = window.location.hash.substring(1);
        const decodedData = JSON.parse(atob(hash));
        auctionCId = decodedData.auctionCId;
    }

    useEffect(() => {
        if (!auctionCId) return;

        const fetchAllData = async () => {
            try {
                const [teamsResponse, auctionResponse, playersResponse] = await Promise.all([
                    fetchTeams(auctionCId),
                    findAuctionByAuctionId(auctionCId),
                    getPlayersByAuctionId(auctionCId)
                ]);

                setTeams(teamsResponse || []);
                setAuction(auctionResponse || {});
                setAuctionPlayers(playersResponse || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load auction data.");
            }
        };
        fetchAllData();
    }, []);

    const categorys = ["ALL", ...new Set(auctionPlayers.map(player => player.sportCatagory))];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm("");
        setStatusFilter("ALL");
        setCategoryFilter("ALL");
    };

    const handleTeamDoubleClick = (teamName) => {
        const teamPlayers = auctionPlayers.filter((player) => player.team === teamName);
        setSelectedTeam(teamName);
        setTeamPlayers(teamPlayers);
    };

    const totalPlayers = auctionPlayers.length;
    const availablePlayers = auctionPlayers.filter((p) => p.status === "Available").length;
    const soldPlayers = auctionPlayers.filter((p) => p.status === "Sold").length;
    const unsoldPlayers = auctionPlayers.filter((p) => p.status === "Unsold").length;

    const filteredPlayers = auctionPlayers.filter((player) => {
        const matchesSearch = player.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || player.status === statusFilter;
        const matchesCategory =
            categoryFilter === "ALL" || player.sportCatagory === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-4 md:p-6">
            <div className="w-full bg-white shadow-md rounded-lg p-2 sm:p-4 md:p-6">

                <div className="relative flex flex-col sm:flex-row items-center mb-4 sm:mb-6 px-2 sm:px-4 md:px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105 mb-4 sm:mb-0 sm:mr-4"
                    >
                        <ArrowBackIcon fontSize="small" />
                        <span className="text-sm sm:text-base md:text-lg font-medium whitespace-nowrap">Back</span>
                    </button>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 mb-4 sm:mb-0">
                        Auction Summary
                    </h2>

                    <div className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-2 md:right-6 md:top-4">
                        <div className="bg-gray-200 border border-gray-200 rounded-lg p-3 sm:p-4 shadow-md w-full sm:w-64 md:w-72">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Selected Team</h4>
                            {selectedTeam ? (
                                <div className="bg-white p-2 rounded-md flex flex-col items-center space-y-2">
                                    <img
                                        src={teams.find(team => team.name === selectedTeam)?.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                        alt={`${selectedTeam} Logo`}
                                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-contain shadow-lg"
                                    />
                                    <h5 className="text-sm sm:text-md font-medium text-gray-700 text-center">{selectedTeam}</h5>
                                </div>
                            ) : (
                                <p className="text-xs sm:text-sm text-gray-600 text-center">No team selected</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex m-10 flex-col sm:flex-row items-center mb-4 gap-4 sm:gap-7 justify-center">
                    <img
                        src={auction.auctionPhoto || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                        alt="Shree Ram Logo"
                        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
                    />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">APL2025</h1>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="flex border-b border-blue-200">
                        <button
                            onClick={() => handleTabChange("team-list")}
                            className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-medium ${
                                activeTab === "team-list"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-blue-600"
                            }`}
                        >
                            Team List
                        </button>
                        <button
                            onClick={() => handleTabChange("player-list")}
                            className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-medium ${
                                activeTab === "player-list"
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-blue-600"
                            }`}
                        >
                            Player List
                        </button>
                    </div>
                </div>

                {activeTab === "team-list" && (
                    <>
                        <p className="text-center text-xs sm:text-sm md:text-base text-gray-600 mb-4">
                            Double click on a row to view the team's players below
                        </p>

                        <div className="flex justify-center mb-4">
                            <div className="relative w-full max-w-md px-2">
                                <FilterListIcon
                                    className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Team"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 text-left">Logo</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Players</th>
                                    <th className="p-2 text-left">Max Points</th>
                                    <th className="p-2 text-left">Points Avail.</th>
                                    <th className="p-2 text-left">Max Bid</th>
                                    <th className="p-2 text-left">Reserve</th>
                                </tr>
                                </thead>
                                <tbody>
                                {teams &&
                                    teams
                                        .filter((team) =>
                                            team.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((team, index) => (
                                            <tr
                                                key={index}
                                                className="border-b hover:bg-gray-100 cursor-pointer"
                                                onDoubleClick={() => handleTeamDoubleClick(team.name)}
                                            >
                                                <td className="p-2">
                                                    <img
                                                        src={team.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                                        alt={`${team.name} Logo`}
                                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-contain"
                                                    />
                                                </td>
                                                <td className="p-2">{team.name}</td>
                                                <td className="p-2">{team.NoOfPlayers}</td>
                                                <td className="p-2">{team.maxPoints.toLocaleString()}</td>
                                                <td className="p-2">{team.pointsAvailable.toLocaleString()}</td>
                                                <td className="p-2">{team.maxPoints.toLocaleString()}</td>
                                                <td className="p-2">{team.reservedPoints.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-center sm:text-left">Players in the Selected Team</h3>
                            {selectedTeam ? (
                                teamPlayers.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
                                            <thead>
                                            <tr className="bg-gray-200">
                                                <th className="p-2 text-left">Picture</th>
                                                <th className="p-2 text-left">Name</th>
                                                <th className="p-2 text-left">Age</th>
                                                <th className="p-2 text-left">Category</th>
                                                <th className="p-2 text-left">Status</th>
                                                <th className="p-2 text-left">Team</th>
                                                <th className="p-2 text-left">Sold For</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {teamPlayers.map((player, index) => (
                                                <tr
                                                    key={index}
                                                    className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                                >
                                                    <td className="p-2">
                                                        <img
                                                            src={player.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                                            alt={`${player.name} Picture`}
                                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="p-2">{player.username}</td>
                                                    <td className="p-2">
                                                        {Math.floor((new Date() - new Date(player.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25))} years
                                                    </td>
                                                    <td className="p-2">{player.sportCatagory}</td>
                                                    <td className="p-2">
                                                            <span
                                                                className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white font-medium text-xs sm:text-sm
                                                                    ${player.status.toLowerCase() === 'sold'
                                                                    ? 'bg-red-500'
                                                                    : player.status.toLowerCase() === 'unsold'
                                                                        ? 'bg-green-500'
                                                                        : 'bg-gray-500'}`}
                                                            >
                                                                {player.status}
                                                            </span>
                                                    </td>
                                                    <td className="p-2">{player.team || "-"}</td>
                                                    <td className="p-2">{player.SoldFor.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">
                                        No players available for the selected team.
                                    </p>
                                )
                            ) : (
                                <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">
                                    Please select a team to view its players.
                                </p>
                            )}
                        </div>
                    </>
                )}

                {activeTab === "player-list" && (
                    <>
                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 p-2 sm:p-4 bg-blue-50 rounded-md justify-center">
                            <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Players: {totalPlayers}</p>
                            </div>
                            <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Available: {availablePlayers}</p>
                            </div>
                            <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Sold: {soldPlayers}</p>
                            </div>
                            <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">Unsold: {unsoldPlayers}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mb-4 px-2">
                            <div className="relative w-full max-w-md mx-auto">
                                <FilterListIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search Player"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base"
                                >
                                    <option value="ALL">Status: ALL</option>
                                    <option value="Available">Available</option>
                                    <option value="Sold">Sold</option>
                                    <option value="Unsold">Unsold</option>
                                </select>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base"
                                >
                                    {categorys.map((category) => (
                                        <option key={category} value={category} className="bg-white">
                                            {category === "ALL" ? "Sports Category: ALL" : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
                                <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2 text-left">Picture</th>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Age</th>
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-left">Status</th>
                                    <th className="p-2 text-left">Team</th>
                                    <th className="p-2 text-left">Sold For</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredPlayers.map((player, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">
                                            <img
                                                src={player.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                                alt={`${player.name} Picture`}
                                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                                            />
                                        </td>
                                        <td className="p-2">{player.username}</td>
                                        <td className="p-2">
                                            {player.dateOfBirth ? (
                                                <span>
                                                        {Math.floor((new Date() - new Date(player.dateOfBirth)) / (1000 * 60 * 60 * 24 * 365.25))} years
                                                    </span>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td className="p-2">{player.sportCatagory}</td>
                                        <td className="p-2">
                                                <span
                                                    className={`inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full text-white font-medium text-xs sm:text-sm
                                                        ${player.status.toLowerCase() === 'sold'
                                                        ? 'bg-red-500'
                                                        : player.status.toLowerCase() === 'unsold'
                                                            ? 'bg-green-500'
                                                            : 'bg-gray-500'}`}
                                                >
                                                    {player.status}
                                                </span>
                                        </td>
                                        <td className="p-2">{player.team || "-"}</td>
                                        <td className="p-2">{player.SoldFor.toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuctionSummaryPage;