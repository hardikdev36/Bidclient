import axios from "axios";
import {error} from "./Error";

export const createTeam = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-team`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const fetchTeams = async (auctionId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-team/${auctionId}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const updateTeam = async (id, formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-team/${id}`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-team/${id}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}