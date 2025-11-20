import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSponsor } from "../../Service/Sponsor_Service.js";
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";

const AddSponsor = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);

    let auctionCId;
    let auctionName;
    if (window?.location?.hash) {
        const hash = window.location.hash.substring(1); // Remove the `#`
        const decodedData = JSON.parse(atob(hash)); // Decode Base64
        auctionCId = decodedData.auctionCId;
        auctionName = decodedData.auctionName;
    }
    const data = JSON.stringify({ auctionCId, auctionName });
    const encodedData = btoa(data); // Convert to Base64

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        if (photo?.size > 10 * 1024 * 1024) {
            toast.error("File size too large! Maximum 10MB limit per file.");
            toast.dismiss(loadingToastId);
            return;
        }

        if (name && photo) {
            const sponsorData = new FormData();
            sponsorData.append('name', name);
            sponsorData.append('photo', photo);
            sponsorData.append('auctionId', auctionCId);

            await createSponsor(sponsorData);
            toast.success("Sponsor added successfully!");
            toast.dismiss(loadingToastId);
            navigate(`/sponsors#${encodedData}`);
        } else {
            toast.error('Please fill all fields!');
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full h-full">
                <div className="flex items-center mb-6 relative">
                    <Back />
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
                        Add Sponsor ({auctionName})
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-lg justify-self-center">

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 font-medium mb-1">Sponsor Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter sponsor name"
                            required
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 font-medium mb-1">Sponsor Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-md focus:outline-none"
                            onChange={(e) => setPhoto(e.target.files[0])}

                        />
                    </div>

                    <div className="mt-6 w-full text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Add Sponsor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSponsor;
