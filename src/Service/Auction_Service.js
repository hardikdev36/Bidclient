import axios from "axios";
import {error} from "./Error";

export const createAuction = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/new-auction`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const getAllAuction = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-auction`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const getAuctionByCreatedBy = async (createdBy) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auction-created-by/${createdBy}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const getAuctionBySelectedPlayer = async (selectedPlayer) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auction-selected-player/${selectedPlayer}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const getAuctionById = async (auctionId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auction-by-id/${auctionId}`);
        return response.data.data;
    } catch (err) {
        throw error(err)
    }
}

export const updateAuction = async (auctionId, form) => {
    try {
        const resonse = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-auction/${auctionId}`, form);
        return resonse.data;
    } catch (e) {
        throw error(e);
    }
}

export const deleteAuctionById = async (auctionId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-auction/${auctionId}`)
        return response.data;
    } catch (e) {
        throw error(e);
    }
}

export const findAuctionByAuctionId = async (auctionId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auction-by-AuctionId/${auctionId}`)
        return response.data;
    } catch (e) {
        throw error(e);
    }
}

export const autoSelectUnsoldPlayer = async (auctionId, statusOfButton) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auto-select-unsold-player/${auctionId}`, {statusOfButton})
        return response.data;
    } catch (e) {
        throw error(e);
    }
}