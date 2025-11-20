import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {sendEmail} from "../../Service/Mixed_Service.js";
import toast from "react-hot-toast";

const ContactUs = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.teamSize) newErrors.teamSize = "Team Size is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        const response = await sendEmail(formData);
        toast.success(response.message);
        toast.dismiss(loadingToastId);

        setFormData({
            fullName: "",
            email: "",
            phone: "",
            location: "",
            message: "",
        });
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-2 sm:p-4 md:p-6">
            <div className="w-full bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8">
                <div className={"flex flex-col sm:flex-row justify-between items-center mb-6 px-4 sm:px-6"}>
                    <button
                        onClick={() => navigate(-1)}
                        className="self-start sm:self-auto flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105 mb-4 sm:mb-0"
                    >
                        <ArrowBackIcon/>
                        <span className="text-base sm:text-lg font-medium whitespace-nowrap">Back</span>
                    </button>
                    <h1 className="pt-4 sm:pt-0 flex-grow text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
                        Contact Us
                    </h1>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-8">
                    Have questions or need support? Fill out the form below, and our team will reach out to you ASAP!
                </p>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    <div className="md:w-1/2">
                        <div className="space-y-6">

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white">🏢</span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                                        Head Quarters
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                        Bid Athlete HQ, 123 Sports Lane, Tech City, IND
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white">📞</span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                                        Call Us
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                        Ask your questions to our support team.
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                        +1-800-123-4567
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white">✉️</span>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                                        Mail Us
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                        Our team will respond shortly.
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                                        <a href="#" className="text-blue-600 hover:underline">
                                            support@bidathlete.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <label className="block text-xs sm:text-sm md:text-base text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base ${
                                        errors.fullName ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm md:text-base text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm md:text-base text-gray-700 mb-1">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base ${
                                        errors.phone ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone && (
                                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm md:text-base text-gray-700 mb-1">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base ${
                                        errors.location ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter your location"
                                />
                                {errors.location && (
                                    <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm md:text-base text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm md:text-base"
                                    rows="4"
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>

                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;