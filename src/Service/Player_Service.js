import axios from "axios";
import { error } from "./Error";

export const createPlayer = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/new-player`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const updatePlayer = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-player`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const deletePlayer = async (username) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-player`, {
            params: { username }
        });
        return response.data;
    } catch (err) {
        throw error(err);
    }
};

export const getPlayerById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/players-by-id/${id}`);
        return response.data;
    } catch (err) {
        throw error(err);
    }
}

export const getPlayersByAuctionId = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/players-by-auctionId/${id}`);
        return response.data;
    } catch (err) {
        throw error(err);
    }
};

export const markUnsoldPlayer = async (id, auctionId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/mark-players-unsold/${id}`, {auctionId});
        return response.data;
    } catch (err) {
        throw error(err);
    }
};

export const updateMinBid = async (id, minBid) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/change-min-bid/${id}`, {minBid});
        return response.data;
    } catch (err) {
        throw error(err);
    }
};

export const markPlayerUnsold = async (auctionId) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/mark-all-player-unsold/${auctionId}`);
        return response.data;
    } catch (err) {
        throw error(err);
    }
};
