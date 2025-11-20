import {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Container, Typography, Paper, Grid, Box, Button, Stack} from '@mui/material';
import {getAuctionById} from '../../Service/Auction_Service';
import GavelIcon from '@mui/icons-material/Gavel';
import CategoryIcon from '@mui/icons-material/Category';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";
import {markPlayerUnsold} from "../../Service/Player_Service.js";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from "../Loader/Loader.jsx";
import Back from "../Back_Button/Back.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const ParticularAuction = () => {
    const [searchParams] = useSearchParams();
    const [auction, setAuction] = useState(null);
    const auctionId = searchParams.get('auctionId');
    const navigate = useNavigate();

    let auctionName
    let auctionCId
    if (auction) {
        auctionName = auction.name;
        auctionCId = auction.auctionId;
    }
    const data = JSON.stringify({auctionCId, auctionName});
    const encodedData = btoa(data);

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

        const fetchAuction = async () => {
            try {
                const response = await getAuctionById(auctionId);
                setAuction(response);
            } catch (error) {
                console.error('Error fetching auction:', error);
            }
        };

        if (auctionId) {
            fetchAuction();
        }

        fetchUserData();
    }, [auctionId]);

    const handleCopyLink = () => {
        const data = JSON.stringify({auctionCId});
        const encodedData = btoa(data);
        navigator.clipboard.writeText(`${window.location.origin}/auction-summary#${encodedData}`);
        toast.success('Summary Link copied!');
    };

    const handleAllPlayerUnsold = () => {
        confirmAlert({
            title: 'Confirm that',
            message: 'Are you sure to do Mark All Player As Unsold.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => playerUnsold()
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const playerUnsold = async () => {
        try {
            const response = await markPlayerUnsold(auctionCId);
            toast.success(response.message);
        } catch (e) {
            toast.error(e.message);
        }
    }

    if (!auction) {
        return (
            <Loader />
        );
    }

    return (
        <Container maxWidth={false}
                   sx={{
                       py: {xs: 2, md: 4},
                       px: '5px',
                       minHeight: '100vh'
                   }}>
            <Paper
                elevation={3}
                sx={{
                    p: {xs: 2, sm: 3, md: 4},
                    borderRadius: 2,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Back />

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: 'wrap',
                            gap: 1,
                            justifyContent: 'right',
                            flexGrow: 1,
                        }}
                    >
                        <Button variant="contained" startIcon={<GavelIcon/>} size="small" sx={{fontSize: '0.75rem'}}
                                onClick={() => navigate('/bid-rule')}>Bid
                            Rules</Button>
                        <Button variant="contained" startIcon={<HandshakeIcon/>} size="small" sx={{fontSize: '0.75rem'}}
                                onClick={() => navigate(`/sponsors#${encodedData}`)}>Sponsor List</Button>
                        <Button onClick={handleAllPlayerUnsold} variant="contained" startIcon={<RestartAltIcon/>}
                                size="small"
                                sx={{fontSize: '0.75rem'}}>Mark All Unsold</Button>
                        <Button variant="contained" startIcon={<HowToRegIcon/>} size="small" sx={{fontSize: '0.75rem'}}
                                onClick={() => navigate(`/add-edit-player#${encodedData}`)}>Player Registration</Button>
                        <Button variant="contained" startIcon={<ContentCopyIcon/>} onClick={handleCopyLink} size="small"
                                sx={{fontSize: '0.75rem'}}>Copy Link</Button>
                    </Stack>
                </Stack>

                <p className={"text-gray-400 flex sm:justify-start justify-center"}>Auction Name</p>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        justifyContent: 'space-between',
                        alignItems: {xs: 'center', sm: 'flex-start'},
                        mb: 4,
                        gap: 3
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: {xs: 'center', sm: 'left'},
                            fontSize: {xs: '1.75rem', sm: '2rem', md: '2.25rem'}
                        }}
                    >
                        {auction.name}
                    </Typography>
                    <Box
                        sx={{
                            width: {xs: '120px', sm: '150px'},
                            height: {xs: '120px', sm: '150px'},
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        <img
                            src={auction.auctionPhoto || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                            alt="Auction Logo"
                            className="w-full h-full object-cover border-2 border-gray-300 rounded-lg bg-white shadow-md"
                        />
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.8)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            height: '100%'
                        }}>
                            <Typography variant="h6" gutterBottom sx={{color: '#1976d2', fontWeight: 600}}>
                                Basic Details
                            </Typography>
                            <Typography sx={{mb: 1}}><strong>Sport Type:</strong> {auction.sportType}</Typography>
                            <Typography
                                sx={{mb: 1}}><strong>Date:</strong> {new Date(auction.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 2,
                            bgcolor: 'rgba(255,255,255,0.8)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            height: '100%'
                        }}>
                            <Typography variant="h6" gutterBottom sx={{color: '#1976d2', fontWeight: 600}}>
                                Auction Rules
                            </Typography>
                            <Typography sx={{mb: 1}}><strong>Minimum Bid:</strong> ${auction.minBid}</Typography>
                            <Typography sx={{mb: 1}}><strong>Bid Increment:</strong> ${auction.bidIncrement}
                            </Typography>
                            <Typography sx={{mb: 1}}><strong>Points per Team:</strong> {auction.pointsPerTeam}
                            </Typography>
                            <Typography><strong>Players per Team:</strong> {auction.playersPerTeam}</Typography>
                        </Box>
                    </Grid>

                    {auction.description && (
                        <Grid item xs={12}>
                            <Box sx={{
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'rgba(255,255,255,0.8)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}>
                                <Typography variant="h6" gutterBottom sx={{color: '#1976d2', fontWeight: 600}}>
                                    Description
                                </Typography>
                                <Typography sx={{lineHeight: 1.7}}>{auction.description}</Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Container>
    );
};

export default ParticularAuction;