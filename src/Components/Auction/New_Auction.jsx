import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { createAuction, getAuctionById, updateAuction } from '../../Service/Auction_Service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const NewAuction = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auctionId = searchParams.get('auctionid');
    const username = localStorage.getItem('username');
    const [isUpdate, setIsUpdate] = useState(false);
    const fileInputRef = useRef(null);

    const sportsList = ["Cricket", "Volleyball", "Football", "Kabaddi", "Kho Kho", "Hockey", "Badminton", "Tennis", "Basketball"];

    const [formData, setFormData] = useState({
        name: '',
        sportType: '',
        pointsPerTeam: '',
        minBid: '',
        bidIncrement: '',
        playersPerTeam: '',
        date: moment().format('YYYY-MM-DD'),
        photo: null,
        createdBy: username
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [currentPhoto, setCurrentPhoto] = useState(null);

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

        if (auctionId) {
            setIsUpdate(true);
            const fetchAuctionDetails = async () => {
                try {
                    const auctionData = await getAuctionById(auctionId);

                    setFormData({
                        name: auctionData.name,
                        photo: auctionData.auctionPhoto,
                        sportType: auctionData.sportType,
                        pointsPerTeam: auctionData.pointsPerTeam,
                        minBid: auctionData.minBid,
                        bidIncrement: auctionData.bidIncrement,
                        playersPerTeam: auctionData.playersPerTeam,
                        date: moment(auctionData.date).format('YYYY-MM-DD'),
                        createdBy: auctionData.createdBy
                    });
                    setPreviewImage(auctionData.auctionPhoto || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain");
                    setCurrentPhoto(auctionData.auctionPhoto); // set current photo

                } catch (err) {
                    console.log(err);
                }
            };
            fetchAuctionDetails();
        }
    }, [auctionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        if (!formData.name || !formData.sportType || !formData.pointsPerTeam || !formData.minBid ||
            !formData.bidIncrement || !formData.playersPerTeam || !formData.date) {
            toast.error("Please fill all fields before submitting.");
            toast.dismiss(loadingToastId);
            return;
        }

        if (formData?.photo?.size > 10 * 1024 * 1024) {
            toast.error("File size too large! Maximum 10MB limit per file.");
            toast.dismiss(loadingToastId);
            return;
        }

        const fData = new FormData();
        fData.append("photo", formData.photo);
        fData.append("name", formData.name);
        fData.append("sportType", formData.sportType);
        fData.append("pointsPerTeam", formData.pointsPerTeam);
        fData.append("minBid", formData.minBid);
        fData.append("bidIncrement", formData.bidIncrement);
        fData.append("playersPerTeam", formData.playersPerTeam);
        fData.append("date", formData.date);
        fData.append("createdBy", username);
        if (currentPhoto) {
            fData.append("currentPhoto", currentPhoto);
        }

        try {
            let response;
            if (isUpdate) {
                response = await updateAuction(auctionId, fData);
            } else {
                response = await createAuction(fData);
            }
            toast.success(response.message);
            toast.dismiss(loadingToastId);
            navigate("/my-auction");
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({ ...prevState, photo: file }));

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

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="relative mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-10">

                <Back />

                <div className="absolute top-4 right-4">
                    <button
                        className="px-6 py-3 text-md font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>

                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 mt-4">
                        {isUpdate ? 'Update Auction' : 'Create New Auction'}
                    </h2>
                    <p className="text-gray-600">Fill in the details
                        to {isUpdate ? 'update your' : 'set up your'} auction event</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={previewImage || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                            alt="Uploaded Preview"
                            className="rounded-full max-h-48 max-w-40 border-4 border-gray-300 shadow-md cursor-pointer"
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            name="photo"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                            ref={fileInputRef}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                Auction Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                placeholder="Enter auction name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="sportType" className="block text-sm font-semibold text-gray-700">Type of
                                Sport</label>
                            <select
                                id="sportType"
                                name="sportType"
                                value={formData.sportType}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                            >
                                <option value="">Select a sport</option>
                                {sportsList.map((sport, index) => (
                                    <option key={index} value={sport}>
                                        {sport}
                                    </option>))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="pointsPerTeam" className="block text-sm font-semibold text-gray-700">Points
                                Per Team</label>
                            <input
                                type="number"
                                id="pointsPerTeam"
                                name="pointsPerTeam"
                                value={formData.pointsPerTeam}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                placeholder="Enter points per team"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="minBid" className="block text-sm font-semibold text-gray-700">Minimum
                                Bid</label>
                            <input
                                type="number"
                                id="minBid"
                                name="minBid"
                                value={formData.minBid}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                placeholder="Enter minimum bid amount"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="bidIncrement" className="block text-sm font-semibold text-gray-700">Bid
                                Increases By</label>
                            <input
                                type="number"
                                id="bidIncrement"
                                name="bidIncrement"
                                value={formData.bidIncrement}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                placeholder="Enter bid increment"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="playersPerTeam" className="block text-sm font-semibold text-gray-700">Players
                                Per Team</label>
                            <input
                                type="number"
                                id="playersPerTeam"
                                name="playersPerTeam"
                                value={formData.playersPerTeam}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                placeholder="Enter players per team"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="date" className="block text-sm font-semibold text-gray-700">Auction
                                Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={moment().format('YYYY-MM-DD')}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                            />
                        </div>
                    </div>

                    {/* Submit Button Positioned Bottom-Right */}
                    <div className="flex justify-end pt-6">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            {isUpdate ? 'Update Auction' : 'Create Auction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewAuction;
