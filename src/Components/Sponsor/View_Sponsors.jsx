import React, { useEffect, useState } from 'react';
import { IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { allSponsor, deleteSponsor, updateSponsor } from "../../Service/Sponsor_Service.js";
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";
import Loader from "../Loader/Loader.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const SponsorsList = () => {
    const [sponsors, setSponsors] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedPhoto, setEditedPhoto] = useState(null);
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteSponsore, setDeleteSponsore] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDeleteClick = (sponsor) => {
        setDeleteSponsore(sponsor);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    let auctionName;
    let auctionCId;
    if (window?.location?.hash) {
        const hash = window.location.hash.substring(1);
        const decodedData = JSON.parse(atob(hash));
        auctionName = decodedData.auctionName;
        auctionCId = decodedData.auctionCId;
    }
    const data = JSON.stringify({ auctionCId, auctionName });
    const encodedData = btoa(data);

    useEffect(() => {
        setLoading(true);
        let loadingTimer;

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

        try {
            const fetchSponsors = async () => {
                try {
                    const response = await allSponsor(auctionCId);
                    setSponsors(response);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchSponsors();
        } catch (e) {
            console.log(e.message);
        } finally {
            clearTimeout(loadingTimer);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, [auctionCId]);

    const handleEdit = (id) => {
        const sponsorToEdit = sponsors.find(sponsor => sponsor._id === id);
        if (sponsorToEdit) {
            setEditingId(id);
            setEditedName(sponsorToEdit.name);
            setEditedPhoto(null);
        }
    };

    const handleSave = async (id) => {
        const loadingToastId = toast.loading("Please wait while we finalize the details...");
        try {
            const editedData = new FormData();
            editedData.append('name', editedName);
            editedData.append('photo', editedPhoto);

            await updateSponsor(id, editedData);
            setSponsors((prevSponsors) => prevSponsors.map((sponsor) => sponsor._id === id ? {
                ...sponsor,
                name: editedName,
                photo: editedPhoto || sponsor.photo
            } : sponsor));
            setEditingId(null);
            toast.success("Sponsor Updated successfully!");
            toast.dismiss(loadingToastId);
            location.reload();
        } catch (e) {
            console.log(e);
            toast.error("Fail to Update Sponsor");
            toast.dismiss(loadingToastId);
        }
    };

    const handleConfirmDelete = async () => {
        const loadingToastId = toast.loading("Please wait while we finalize the details...");
        try {
            await deleteSponsor(deleteSponsore._id);
            setSponsors((prevSponsors) => prevSponsors.filter(sponsor => sponsor._id !== deleteSponsore._id));
            setOpenDeleteDialog(false);
            toast.success("Sponsor Deleted Successfully!");
            toast.dismiss(loadingToastId);
        } catch (e) {
            console.log(e);
            toast.error("Fail to Delete Sponsor");
            toast.dismiss(loadingToastId);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedName('');
        setEditedPhoto(null);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-4 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between mb-5 gap-2">
                    <Back />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                        Sponsors List
                        ({auctionName})
                    </h1>
                    <div className="text-center mb-2">
                        <button
                            onClick={() => navigate(`/add-sponsors#${encodedData}`)}
                            className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Add Sponsor
                        </button>
                    </div>
                </div>

                {sponsors.length > 0 && sponsors.some(sponsor => !sponsor?.isDeleted) ? (
                    <ul className="space-y-3 mx-2 sm:mx-5">
                        {sponsors.map((sponsor, idx) => (
                            !sponsor?.isDeleted && (
                                <li key={idx}
                                    className="bg-gray-50 shadow rounded-md p-4 border border-gray-200 flex flex-col sm:flex-row items-center justify-between hover:shadow-lg">
                                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                        {editingId === sponsor._id ? (
                                            <>
                                                <input type="file" accept="image/*"
                                                       onChange={(e) => setEditedPhoto(e.target.files[0])} />
                                            </>
                                        ) : (
                                            sponsor.photo && (
                                                <img
                                                    src={`${sponsor.photo}`}
                                                    alt={sponsor.name}
                                                    className="w-16 h-16 rounded-full border-2 border-gray-300 object-contain" />
                                            )
                                        )}
                                        {editingId === sponsor._id ? (
                                            <TextField value={editedName} onChange={(e) => setEditedName(e.target.value)}
                                                       size="small" className="w-full sm:w-auto" />
                                        ) : (
                                            <span
                                                className="text-gray-800 font-medium text-center sm:text-left">{sponsor.name}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mt-3 sm:mt-0">
                                        {editingId === sponsor._id ? (
                                            <>
                                                <IconButton color="primary" size="small"
                                                            onClick={() => handleSave(sponsor._id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton color="default" size="small" onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton color="secondary" size="small"
                                                            onClick={() => handleEdit(sponsor._id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="error" size="small"
                                                            onClick={() => handleDeleteClick(sponsor)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">
                        <Typography variant="h6" color="text.secondary">
                            No sponsors found for this auction
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Click "Add Sponsor" to create your first sponsor!
                        </Typography>
                    </div>
                )}
            </div>
            {openDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete <b>{deleteSponsore?.name}</b>?</p>
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
        </div>
    );
};

export default SponsorsList;