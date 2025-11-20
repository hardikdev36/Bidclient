import React, {useEffect, useState} from 'react';
import {IconButton, TextField, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {useNavigate} from 'react-router-dom';
import {deleteTeam, fetchTeams, updateTeam} from "../../Service/Team_Service.js";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";
import Loader from "../Loader/Loader.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [editedData, setEditedData] = useState({name: "", photo: null});
    const navigate = useNavigate();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteTeamD, setDeleteTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDeleteClick = (team) => {
        setDeleteTeam(team);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    let auctionName, auctionCId;
    if (window?.location?.hash) {
        const hash = window.location.hash.substring(1);
        const decodedData = JSON.parse(atob(hash));
        auctionName = decodedData.auctionName;
        auctionCId = decodedData.auctionCId;
    }
    const data = JSON.stringify({auctionCId, auctionName});
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
            const fetchTeamData = async () => {
                try {
                    const response = await fetchTeams(auctionCId);
                    setTeams(response);
                } catch (e) {
                    console.log(e.message);
                }
            };
            fetchTeamData();
        } catch (error) {
            console.log(error.message);
        } finally {
            clearTimeout(loadingTimer);
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }
    }, [auctionCId]);

    const handleConfirmDelete = async () => {
        try {
            await deleteTeam(deleteTeamD._id);
            setTeams((prevTeams) => prevTeams.filter(team => team._id !== deleteTeamD._id));
            setOpenDeleteDialog(false);
            toast.success("Team deleted successfully!");
        } catch (e) {
            console.log(e.message);
            toast.error("Failed to delete team");
        }
    };

    const handleEdit = (team) => {
        setEditingTeamId(team._id);
        setEditedData({name: team.name, photo: null});
    };

    const handleChange = (e, field) => {
        if (field === "photo") {
            const file = e.target.files[0];
            setEditedData((prev) => ({...prev, photo: file}));
        } else {
            setEditedData((prev) => ({...prev, [field]: e.target.value}));
        }
    };

    const handleSave = async (id) => {
        const loadingToastId = toast.loading("Please wait while we finalize the details...");
        try {
            const editForm = new FormData();
            editForm.append('name', editedData.name);
            editForm.append('photo', editedData.photo);

            await updateTeam(id, editForm);

            setTeams((prevTeams) =>
                prevTeams.map((team) =>
                    team._id === id
                        ? {
                            ...team,
                            name: editedData.name,
                            photo: editedData.photo ? URL.createObjectURL(editedData.photo) : team.photo
                        }
                        : team
                )
            );
            setEditingTeamId(null);
            toast.success("Team Updated successfully!");
            toast.dismiss(loadingToastId);
            location.reload();
        } catch (e) {
            console.log(e.message);
            toast.error("Error to update team");
            toast.dismiss(loadingToastId);
        }
    };

    const handleCancel = () => {
        setEditingTeamId(null);
        setEditedData({name: "", photo: null});
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
                        Team List :- {auctionName}
                    </h1>
                    <div className="text-center mb-2">
                        <button
                            onClick={() => navigate(`/add-teams#${encodedData}`)}
                            className="px-8 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            Add Team
                        </button>
                    </div>
                </div>

                {/* Teams Display */}
                {teams.length > 0 ? (
                    <ul className="space-y-3 mx-2 sm:mx-5">
                        {teams.map((team, idx) => (
                            <li
                                key={idx}
                                className="bg-gray-50 shadow rounded-md p-4 border border-gray-200 flex flex-col sm:flex-row items-center justify-between hover:shadow-lg"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                    {editingTeamId === team._id ? (
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-600 text-sm">Photo</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleChange(e, "photo")}
                                                className="border border-gray-300 rounded px-2 py-1"
                                            />
                                            <label className="text-gray-600 text-sm">Name</label>
                                            <TextField
                                                value={editedData.name}
                                                onChange={(e) => handleChange(e, "name")}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {team.photo && (
                                                <img
                                                    src={`${team.photo}`}
                                                    alt={team.name}
                                                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-contain"
                                                />
                                            )}
                                            <span className="text-gray-800 font-medium text-center sm:text-left">{team.name}</span>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-3 sm:mt-0">
                                    {editingTeamId === team._id ? (
                                        <>
                                            <IconButton
                                                color="primary"
                                                size="medium"
                                                onClick={() => handleSave(team._id)}
                                                className="transition-transform transform hover:scale-105"
                                            >
                                                <SaveIcon/>
                                            </IconButton>
                                            <IconButton
                                                color="default"
                                                size="small"
                                                onClick={handleCancel}
                                            >
                                                <CancelIcon/>
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton
                                                color="secondary"
                                                size="medium"
                                                onClick={() => handleEdit(team)}
                                                className="transition-transform transform hover:scale-105"
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                size="medium"
                                                onClick={() => handleDeleteClick(team)}
                                                className="transition-transform transform hover:scale-105"
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8">
                        <Typography variant="h6" color="text.secondary">
                            No teams found for this auction
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Click "Add Team" to create your first team!
                        </Typography>
                    </div>
                )}
            </div>
            {openDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete <b>{deleteTeamD?.name}</b>?</p>
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

export default TeamList;