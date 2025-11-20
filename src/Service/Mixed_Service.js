import axios from "axios";
import { error } from "./Error";

export const soldPlayer = async (form) => {
    try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/sold`, form);
    } catch (err) {
        throw error(err)
    }
}

export const unsoldPlayer = async (id) => {
    try {
        await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/unsold`, id);
    } catch (err) {
        throw error(err)
    }
}

export const sendEmail = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/send-mail`, formData);
        return response.data;
    } catch (error) {
        throw error(error);
    }
}