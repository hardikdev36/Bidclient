import axios from "axios";
import {error} from "./Error";

export const createSponsor = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add-sponsor`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const allSponsor = async (auctionId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/all-sponsor/${auctionId}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const updateSponsor = async (id, form) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update-sponsor/${id}`, form);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}

export const deleteSponsor = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete-sponsor/${id}`);
        return response.data;
    } catch (err) {
        throw error(err)
    }
}