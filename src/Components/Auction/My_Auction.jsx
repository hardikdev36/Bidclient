import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    IconButton,
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {
    deleteAuctionById,
    getAllAuction,
    getAuctionByCreatedBy,
    getAuctionBySelectedPlayer
} from '../../Service/Auction_Service';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Tooltip from '@mui/material/Tooltip';
import GavelIcon from "@mui/icons-material/Gavel";
import {fetchTeams} from "../../Service/Team_Service.js";
import {getPlayersByAuctionId} from "../../Service/Player_Service.js";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const MyAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [openPlayerFormDialog, setOpenPlayerFormDialog] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const [deleteAuction, setDeleteAuction] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [auctionName, setAuctionName] = useState('');
    const [auctionCId, setAuctionCId] = useState('');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState()

    const handleDeleteClick = (auction) => {
        setDeleteAuction(auction);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        const loadingToastId = toast.loading("Please wait while we finalize the details...");
        try {
            setOpenDeleteDialog(false);
            await deleteAuctionById(deleteAuction.auctionId);
            setAuctions(auctions.filter(auction => auction._id !== deleteAuction._id));
            toast.success("Auction deleted successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to delete auction");
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    useEffect(() => {
        setLoading(true);
        let loadingTimer;

        try {
            const fetchUserData = async () => {
                try {
                    const user = await loggedUser();
                    if (!user) {
                        toast.error("Please Login First!");
                        navigate("/");
                    } else {
                        setUserData(user);
                    }
                } catch (e) {
                    console.log(e.message);
                    toast.error("Please Login First!");
                    navigate("/");
                }
            };
            const fetchAuctions = async () => {
                const data = await getAuctionByCreatedBy(username);
                setAuctions(data.data);
            }

            fetchUserData();
            fetchAuctions();
        } catch (e) {
            console.error("Error fetching auctions:", e);
        } finally {
            clearTimeout(loadingTimer);
            setTimeout(() => {
                setLoading(false);
            }, 1500)
        }
    }, [username]);

    if (!userData) {
        return null;
    }

    const filteredAuctions = auctions.filter(auction =>
        auction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePlayerForm = (auction) => {
        setOpenPlayerFormDialog(true);
        setAuctionName(auction.name);
        setAuctionCId(auction.auctionId);
    };

    const handleClosePlayerFormDialog = () => {
        setOpenPlayerFormDialog(false);
        setCopySuccess('');
    };

    const handleCopyToClipboard = (e) => {
        e.preventDefault();

        const data = JSON.stringify({auctionCId, auctionName});
        const encodedData = btoa(data); // Convert to Base64

        const link = `${window.location.origin}/add-edit-player#${encodedData}`;
        navigator.clipboard.writeText(link)
            .then(() => {
                setCopySuccess('Link copied!');
            })
            .catch(err => {
                setCopySuccess('Failed to copy link: ' + err);
            });
    };

    const handleAllPlayers = (auctionCId, auctionName) => {
        const data = JSON.stringify({auctionCId, auctionName});
        const encodedData = btoa(data); // Convert to Base64
        navigate(`/player#${encodedData}`);
    }

    const handleAllTeams = (auctionCId, auctionName) => {
        const data = JSON.stringify({auctionCId, auctionName});
        const encodedData = btoa(data);
        navigate(`/teams#${encodedData}`);
    }

    const handleAuctionSetting = (auctionCId) => {
        const data = JSON.stringify({auctionCId});
        const encodedData = btoa(data);
        navigate(`/setting#${encodedData}`);
    }

    const handleAuctionSummary = (auctionCId) => {
        const data = JSON.stringify({auctionCId});
        const encodedData = btoa(data);
        navigate(`/auction-summary#${encodedData}`);
    }

    const handleAuctionDashboard = async (auctionCId) => {
        const teams = await fetchTeams(auctionCId);
        const players = await getPlayersByAuctionId(auctionCId);
        if (!teams || teams.length === 0 || !players || players.length === 0) {
            if (!teams || teams.length === 0) {
                return toast.error("Please add Team to play Auctions.");
            }
            if (!players || players.length === 0) {
                return toast.error("Please add Player to play Auctions.");
            }
        }

        const data = JSON.stringify({auctionCId});
        const encodedData = btoa(data);
        navigate(`/bidder-auction#${encodedData}`);
    }

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <Container maxWidth="lg" sx={{py: 4, minHeight: '100vh'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', sm: 'row'},
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    gap: 2,
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom sx={{textAlign: 'left'}}>
                    Auctions
                </Typography>

                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                    <TextField
                        label="Search auctions..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: {xs: '100%', sm: '300px'},
                            textAlign: 'center',
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/create-auction"
                        sx={{
                            width: {xs: '100%', sm: 'auto'},
                            textAlign: 'center',
                        }}
                    >
                        Create New Auction
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="auction table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAuctions.length > 0 ? (
                            filteredAuctions.map((auction, index) => (
                                !auction?.isdelete && (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell>{auction.name}</TableCell>
                                            <TableCell>{new Date(auction.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
                                                    {/* ... All IconButtons remain the same ... */}
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => navigate(`/auction?auctionId=${auction._id}`)}
                                                    >
                                                        <Tooltip title={"View Auction"} arrow placement="top">
                                                            <VisibilityIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleAllPlayers(auction.auctionId, auction.name)}
                                                    >
                                                        <Tooltip title={"All Player List"} arrow placement="top">
                                                            <PeopleIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleAllTeams(auction.auctionId, auction.name)}
                                                    >
                                                        <Tooltip title={"All Team List"} arrow placement="top">
                                                            <GroupsIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handlePlayerForm(auction)}
                                                    >
                                                        <Tooltip title={"Player ragistration form for this auction"}
                                                                 arrow
                                                                 placement="top">
                                                            <PersonAddIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleAuctionDashboard(auction.auctionId)}
                                                    >
                                                        <Tooltip title={"Open Auction Dashboard"} arrow placement="top">
                                                            <GavelIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleAuctionSetting(auction.auctionId)}
                                                    >
                                                        <Tooltip title={"Open Auction Setting"} arrow placement="top">
                                                            <SettingsIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleAuctionSummary(auction.auctionId)}
                                                    >
                                                        <Tooltip title={"Auction Summary"} arrow placement="top">
                                                            <SummarizeIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => navigate(`/create-auction?auctionid=${auction._id}`)}
                                                    >
                                                        <Tooltip title={"Edit Auction"} arrow placement="top">
                                                            <EditIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        onClick={() => handleDeleteClick(auction)}
                                                    >
                                                        <Tooltip title={"Delete Auction"} arrow placement="top">
                                                            <DeleteIcon/>
                                                        </Tooltip>
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                )
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} sx={{textAlign: 'center', py: 4}}>
                                    <Typography variant="body1" color="text.secondary">
                                        You have no Auctions created yet!
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openPlayerFormDialog} onClose={handleClosePlayerFormDialog}>
                <DialogTitle>Add Player</DialogTitle>
                <DialogContent>
                    <Typography>
                        Go to the player creation form:
                    </Typography>
                    <Link to="/add-edit-player" className='text-blue-600' onClick={handleCopyToClipboard}>
                        Click to Copy link
                    </Link>
                    {copySuccess &&
                        <Typography color='red' display='block' variant="caption">{copySuccess}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePlayerFormDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {openDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete <b>{deleteAuction?.name}</b>?</p>
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

        </Container>
    );
};

export default MyAuction;
