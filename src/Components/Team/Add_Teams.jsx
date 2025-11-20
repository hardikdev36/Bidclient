import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTeam } from "../../Service/Team_Service.js";
import { allSponsor } from "../../Service/Sponsor_Service.js";
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";

const AddTeam = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [selectedSponsor, setSelectedSponsor] = useState('');
    const [sponsors, setSponsors] = useState([]);

    const [auctionCId, setAuctionCId] = useState('');
    const [auctionName, setAuctionName] = useState('');

    useEffect(() => {
        if (window?.location?.hash) {
            const hash = window.location.hash.substring(1); // Remove `#`
            try {
                const { auctionCId, auctionName } = JSON.parse(atob(hash)); // Decode Base64
                setAuctionCId(auctionCId);
                setAuctionName(auctionName);
            } catch (error) {
                console.error("Error decoding auctionId:", error);
            }
        }

        const sponsors = async () => {
            if (!auctionCId) return;
            try {
                const response = await allSponsor(auctionCId);
                setSponsors(response);
            } catch (e) {
                console.log(e);
            }
        }
        sponsors();
    }, [auctionCId]);

    const handleAddTeam = async (e) => {
        e.preventDefault();
        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        if (photo?.size > 10 * 1024 * 1024) {
            toast.error("File size too large! Maximum 10MB limit per file.");
            toast.dismiss(loadingToastId);
            return;
        }

        try {
            const teamData = new FormData();
            teamData.append('name', name);
            teamData.append('photo', photo);
            teamData.append('sponsor', selectedSponsor);
            teamData.append('auctionId', auctionCId);

            const response = await createTeam(teamData);
            toast.success(response.message);
            toast.dismiss(loadingToastId);

            const data = JSON.stringify({ auctionCId, auctionName });
            const encodedData = btoa(data);

            navigate(`/teams#${encodedData}`);
        } catch (e) {
            console.log(e);
            toast.error("Fail to Add Team");
            toast.dismiss(loadingToastId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full h-full">
                <div className="flex items-center mb-6 relative">
                    <Back />
                    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800">
                        Add Team ({auctionName})
                    </h1>
                </div>

                <form onSubmit={handleAddTeam} className="flex flex-col items-center max-w-lg justify-self-center">

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 font-medium mb-1">Team Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter team name"
                            required
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 font-medium mb-1">Team Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded-md focus:outline-none"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label className="block text-gray-700 font-medium mb-1">Sponsor</label>
                        <select
                            value={selectedSponsor}
                            onChange={(e) => setSelectedSponsor(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select a sponsor</option>
                            {sponsors.map((sponsor, index) => (
                                <option key={index} value={sponsor.name}>{sponsor.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6 w-full text-center">
                        <button
                            type="submit"
                            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Add Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeam;
