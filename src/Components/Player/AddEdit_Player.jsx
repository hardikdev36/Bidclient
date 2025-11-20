import {useState, useEffect, useRef} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {createPlayer, getPlayerById, updatePlayer} from "../../Service/Player_Service.js";
import {findAuctionByAuctionId} from "../../Service/Auction_Service.js";
import sportsData from '../jsons/sports.json';
import toast from "react-hot-toast";
import Loader from "../Loader/Loader.jsx";

const AddEditPlayer = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const playerId = searchParams.get("playerId");
    const [auctionId, setAuctionId] = useState('');
    const [auctionDetails, setAuctionDetails] = useState({});
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const [player, setPlayer] = useState({
        photo: null,
        username: "",
        firstName: "",
        lastName: "",
        sportCatagory: "",
        mobileNumber: "",
        email: "",
        dateOfBirth: "",
        tshirtSize: "",
        trouserSize: "",
        achievements: "",
        auctionId: "",
        minBid: 0,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (window?.location?.hash) {
            try {
                const hash = window.location.hash.substring(1);
                const decodedData = JSON.parse(atob(hash));
                setAuctionId(decodedData.auctionCId);
                setPlayer((prev) => ({...prev, auctionId: decodedData.auctionCId}));
            } catch (error) {
                console.error("Invalid hash data", error);
            }
        }
    }, []);

    useEffect(() => {
        const auction = async () => {
            try {
                const response = await findAuctionByAuctionId(auctionId);
                setAuctionDetails(response);
                setPlayer({minBid: response.minBid, auctionId: response.auctionId});
            } catch (e) {
                console.log(e);
            }
        };
        if (auctionId) auction();
    }, [auctionId]);

    useEffect(() => {
        if (playerId) {
            const fetchPlayer = async () => {
                try {
                    const response = await getPlayerById(playerId);
                    setPlayer((prev) => ({
                        ...prev,
                        ...response,
                    }));
                    setPreviewImage(response.photo);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchPlayer();
        }
    }, [playerId]);

    const validateInput = (name, value) => {
        let error = "";
        if (!value) {
            error = `${name} is required`;
        } else {
            if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Invalid email format";
            }
            if (name === "mobileNumber" && !/^\d{10}$/.test(value)) {
                error = "Mobile number must be 10 digits";
            }
        }
        setErrors((prev) => ({...prev, [name]: error}));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        validateInput(name, value);
        setPlayer((prev) => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPlayer((prev) => ({...prev, photo: file}));
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        try {
            if (player?.photo?.size > 10 * 1024 * 1024) {
                toast.error("File size too large! Maximum 10MB limit per file.");
                toast.dismiss(loadingToastId);
                return;
            }

            const hasErrors = Object.values(errors).some((error) => error);
            if (hasErrors) {
                toast.error("Please fix the errors before submitting.");
                toast.dismiss(loadingToastId);
                return;
            }

            const playerData = new FormData();
            Object.keys(player).forEach((key) => {
                if (player[key] !== null && player[key] !== undefined) {
                    playerData.append(key, player[key]);
                }
            });

            let response;
            if (playerId) {
                response = await updatePlayer(playerData);
            } else {
                response = await createPlayer(playerData);
            }

            if (response.message === "Player already exists") {
                toast.error("A player with this username already exists!");
                toast.dismiss(loadingToastId);
                return;
            }

            if (!response.data) {
                throw new Error(response.message || "Failed to process player data");
            }

            const auctionCId = auctionDetails.auctionId;
            const auctionName = auctionDetails.auctionName;
            const encodedData = btoa(JSON.stringify({ auctionCId, auctionName }));
            navigate(`/player#${encodedData}`);
            toast.success(playerId ? "Player updated successfully!" : "Player created successfully!");

        } catch (e) {
            console.error("Error in handleSubmit:", e);
            const errorMessage = e.response?.data?.message || e.message || "Failed to perform operation";
            toast.error(errorMessage);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    const today = new Date();
    const minDate18 = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        .toISOString()
        .split("T")[0];

    if (playerId) {
        if (!player) {
            return (<Loader/>);
        }
    }

    return (
        <div className="m-[5px] p-6 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full bg-white shadow-md rounded-lg p-6 h-full">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-4 sm:px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start sm:self-auto flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105 mb-4 sm:mb-0"
                    >
                        <ArrowBackIcon/>
                        <span className="text-base sm:text-lg font-medium whitespace-nowrap">Back</span>
                    </button>
                    <h2 className="pt-4 sm:pt-0 text-lg sm:text-xl font-bold text-center flex-grow">
                        {playerId ? `Edit Player ${player?.username}` : `Player Form for ${auctionDetails?.name}`}
                    </h2>
                </div>

                <form id="playerForm" onSubmit={handleSubmit} className="space-y-4 sm:grid grid-cols-2 gap-x-4">
                    <div className="flex flex-col items-center space-y-2 col-span-2">
                        <img
                            src={previewImage || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                            alt="Player Preview"
                            className="rounded-full h-40 w-40 border-4 border-gray-300 shadow-md cursor-pointer object-contain"
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                        />
                    </div>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username *"
                        value={player.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.username && <p className="text-red-500">{errors.username}</p>}

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={player.firstName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        value={player.lastName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <select
                        name="sportCatagory"
                        value={player.sportCatagory}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Position</option>
                        {sportsData[auctionDetails.sportType]?.map((position) => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number *"
                        value={player.mobileNumber}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={player.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                    <input
                        type="date"
                        name="dateOfBirth"
                        value={player.dateOfBirth}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        max={minDate18}
                    />

                    <select
                        name="tshirtSize"
                        value={player.tshirtSize}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select T-Shirt Size</option>
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <select
                        name="trouserSize"
                        value={player.trouserSize}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Trouser Size</option>
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    <textarea
                        name="achievements"
                        placeholder="Achievements"
                        value={player.achievements}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </form>

                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        form="playerForm"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        {playerId ? "Update Player" : "Add Player"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditPlayer;