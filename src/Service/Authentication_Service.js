import axios from "axios";
import { error } from "./Error";

export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`,
            { username, password }
        );
        return response.data;
    } catch (err) {
        throw error(err)
    }
};

export const signup = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
};

export const loggedUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/loggedinuser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return response.data.user;
    } catch (err) {
        throw error(err)
    }
};

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/${id}`);
        return response.data.user;
    } catch (err) {
        throw error(err)
    }
};

export const updateUser = async (id, formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/updateuser/${id}`, formData);
        return response.data;
    } catch (err) {
        throw error(err)
    }
};

