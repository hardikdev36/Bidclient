import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {useNavigate} from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105 mb-2"
        >
            <ArrowBackIcon/>
            <span className="text-lg font-medium">Back</span>
        </button>
    )
}

export default BackButton