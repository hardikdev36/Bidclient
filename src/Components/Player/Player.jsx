import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import {deletePlayer, getPlayersByAuctionId, markUnsoldPlayer, updateMinBid} from '../../Service/Player_Service';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Button,
    IconButton,
    Box,
    TextField,
    DialogActions
} from '@mui/material';
import {Edit, Delete, Refresh, AttachMoney, Add} from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import toast from "react-hot-toast";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Back from "../Back_Button/Back.jsx";
import Loader from "../Loader/Loader.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const Player = () => {
    const navigate = useNavigate();
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [auctionCId, setAuctionCId] = useState('');
    const [auctionName, setAuctionName] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletePlayerD, setDeletePlayer] = useState(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [newMinBid, setNewMinBid] = useState('');
    const [chnageBidId, setChnageBidId] = useState('');

    const handleDeleteClick = (team) => {
        setDeletePlayer(team);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

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

        if (window?.location?.hash) {
            const hash = window.location.hash.substring(1); // Remove `#`
            try {
                const {auctionCId, auctionName} = JSON.parse(atob(hash)); // Decode Base64
                setAuctionCId(auctionCId);
                setAuctionName(auctionName);
            } catch (error) {
                console.error("Error decoding auctionId:", error);
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        if (!auctionCId) return;

        const fetchPlayers = async () => {
            try {
                const response = await getPlayersByAuctionId(auctionCId);
                setPlayers(response);
            } catch (e) {
                toast.error(e.message);
            }
        };

        fetchPlayers();
    }, [auctionCId]);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPlayer(null);
    };

    const handleAddPlayer = () => {
        const data = JSON.stringify({auctionCId, auctionName});
        const encodedData = btoa(data);
        navigate(`/add-edit-player#${encodedData}`);
    }

    const handleConfirmDelete = async () => {
        try {
            await deletePlayer(deletePlayerD.username);
            setPlayers((prevPlayers) => prevPlayers.filter(player => player.username !== deletePlayerD.username));
            toast.success("Player deleted successfully.");
            setOpenDeleteDialog(false);
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleEditButton = async (id) => {
        try {
            const data = JSON.stringify({auctionCId});
            const encodedData = btoa(data);
            navigate(`/add-edit-player?playerId=${id}#${encodedData}`);
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleMarkUnsold = async (id) => {
        confirmAlert({
            title: 'Confirm that',
            message: 'Are you sure to do Mark this Player As Unsold.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => markUnsold(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const markUnsold = async (id) => {
        try {
            const response = await markUnsoldPlayer(id, auctionCId);
            toast.success(response.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    const handleSubmitNewBid = async () => {
        try {
            await updateMinBid(chnageBidId, newMinBid);
            toast.success("Minimum bid updated successfully.");
            setIsSearchModalOpen(false);
            setPlayers((players) =>
                players.map((player) =>
                    player._id === chnageBidId ? {...player, minBid: newMinBid} : player
                )
            );
        } catch (e) {
            toast.error(e.message);
        }
    };

    if (!players) {
        return (
            <Loader/>
        )
    }

    return (
        <div
            className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto">

                <div
                    className="flex flex-wrap items-center justify-between md:flex-nowrap gap-4 bg-white/80 backdrop-blur-sm rounded-md shadow-xl p-4 mb-4">

                    <div className="w-full md:w-auto flex justify-start">
                        <Back/>
                    </div>

                    <h1 className="text-xl font-bold text-gray-700 text-center w-full md:flex-1">
                        Players List {auctionName && `of ${auctionName}`}
                    </h1>

                    <div className="w-full md:w-auto flex justify-end">
                        <Button
                            startIcon={<Add/>}
                            onClick={() => handleAddPlayer()}
                            variant="contained"
                            color="primary"
                        >
                            Add Player
                        </Button>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-md shadow-xl overflow-x-auto">
                    {players.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-1 py-2 md:px-2 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                                <th className="px-1 py-2 md:px-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Min.
                                    Bid
                                </th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sports
                                    Category
                                </th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mobile
                                    Number
                                </th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                                <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {players.map((player, index) => (
                                <tr key={index}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                                    <td>
                                        <img
                                            src={player.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                            alt={player.photo}
                                            className="h-12 w-12 m-2 ml-0 md:ml-5 rounded-full object-contain"/>
                                    </td>
                                    <td className="px-2 py-2 md:px-4 whitespace-nowrap hover:text-blue-500"
                                        onClick={() => handlePlayerClick(player)}>
                                        {player.username}
                                    </td>
                                    <td className="px-1 py-2 whitespace-nowrap">${player.minBid}</td>
                                    <td className="px-1 py-2 whitespace-nowrap">{player.sportCatagory}</td>
                                    <td className="px-1 py-2 whitespace-nowrap">{player.mobileNumber}</td>
                                    <td className="px-1 py-2 whitespace-nowrap">{player.email}</td>
                                    <td className="px-1 py-2 whitespace-nowrap">{moment().diff(moment(player.dateOfBirth), 'years')}</td>
                                    <td className="px-1 py-2 whitespace-nowrap flex space-x-2">
                                        <IconButton color="primary" onClick={() => handleEditButton(player._id)}>
                                            <Tooltip title={"Edit Player"} arrow placement="top">
                                                <Edit/>
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => handleMarkUnsold(player._id)}>
                                            <Tooltip title={"Mark this player as available for Available"} arrow
                                                     placement="top">
                                                <Refresh/>
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setIsSearchModalOpen(true);
                                                setChnageBidId(player._id);
                                                setNewMinBid(player.minBid);
                                            }}
                                            color="primary"
                                        >
                                            <Tooltip title={"Change minimum Bidder"} arrow placement="top">
                                                <AttachMoney/>
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteClick(player)}>
                                            <Tooltip title={"Delete Player"} arrow placement="top">
                                                <Delete/>
                                            </Tooltip>
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-8">
                            <Typography variant="h6" color="text.secondary">
                                No players found for this auction
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
                                Click "Add Player" to create your first player!
                            </Typography>
                        </div>
                    )}
                </div>

                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    {selectedPlayer && (
                        <>
                            <DialogTitle>
                                Player Details
                                <Button onClick={handleClose} style={{float: 'right'}}>Close</Button>
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2"
                                                            color="textSecondary">Username</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.username}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">First
                                                    Name</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.firstName}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">Last
                                                    Name</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.lastName}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">Sport</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.sportCatagory}</Typography>
                                                <Typography variant="subtitle2"
                                                            color="textSecondary">Achievements</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.achievements}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.email}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">Date of
                                                    Birth</Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    {moment(selectedPlayer.dateOfBirth).format('MMMM D, YYYY')}
                                                </Typography>
                                                <Typography variant="subtitle2" color="textSecondary">T-Shirt
                                                    size</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.tshirtSize}</Typography>
                                                <Typography variant="subtitle2" color="textSecondary">Trouser
                                                    size</Typography>
                                                <Typography variant="body1"
                                                            gutterBottom>{selectedPlayer.trouserSize}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                            <img
                                                src={`${selectedPlayer.photo}`}
                                                alt={selectedPlayer.username}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '300px',
                                                    borderRadius: '8px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </>
                    )}
                </Dialog>
            </div>

            {openDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete <b>{deletePlayerD?.username}</b>?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                onClick={handleCloseDeleteDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                onClick={handleConfirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Change Minimum Bid</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="New Minimum Bid..."
                        value={newMinBid}
                        onChange={(e) => setNewMinBid(e.target.value)}
                        margin="dense"
                        variant="outlined"
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSearchModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitNewBid}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Player;
