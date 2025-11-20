import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {useSearchParams, useNavigate} from 'react-router-dom';
import {getUserById, updateUser} from '../../Service/Authentication_Service';
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";
import Loader from "../Loader/Loader.jsx";

const Edit_Profile = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        dob: "",
        fullName: "",
        phoneNumber: "",
        photo: null,
        username: "",
    })
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(id);
            setFormData(user);
            setFormData(prevState => ({
                ...prevState,
                dob: new Date(user.dob).toISOString().split('T')[0]
            }))
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loadingToastId = toast.loading("Please wait while we finalize the details...");

        if (formData?.photo?.size > 10 * 1024 * 1024) {
            toast.error("File size too large! Maximum 10MB limit per file.");
            toast.dismiss(loadingToastId);
            return;
        }

        const form = new FormData();
        form.append("photo", formData.photo);
        form.append("username", formData.username);
        form.append("fname", formData.fullName);
        form.append("dob", formData.dob);
        form.append("number", formData.phoneNumber);
        form.append("address", formData.address);
        form.append("city", formData.city);

        try {
            await updateUser(id, form);
            toast.success("User updated successfully");
            toast.dismiss(loadingToastId);
            navigate("/profile")
        } catch (err) {
            console.log(err)
        }
    }

    // upload file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({...formData, photo: file});

        // Create preview URL for the selected image
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    if (id) {
        if (!formData) {
            return (
                <Loader />
            )
        }
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-5 px-3 sm:px-6 lg:px-8">
            <div
                className="w-full mx-auto bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-white/20">
                <Back />
                <div className="mb-14 text-center">
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-3">
                        Edit Your Profile
                    </h2>
                    <p className="text-gray-600 text-lg">Customize your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="flex justify-center mb-12">
                        <div className="relative cursor-pointer group">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                                id="photo-upload"
                            />
                            <label htmlFor="photo-upload">
                                <div
                                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl transition-transform duration-300 group-hover:scale-105">
                                    {previewUrl || formData.photo ? (
                                        <img
                                            src={previewUrl || `${formData.photo}`}
                                            alt="Profile"
                                            name="photo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
                                            <span className="text-white text-center font-medium">Click to upload profile photo</span>
                                        </div>
                                    )}
                                </div>
                            </label>
                            <div className="absolute -bottom-2 right-0 bg-purple-600 rounded-full p-2 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label htmlFor="fullName"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Full
                                Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="username"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                                placeholder="Choose a username"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="dateOfBirth"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Date of
                                Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                                max={moment().format('YYYY-MM-DD')}
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700"
                            />
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="phoneNumber"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Phone
                                Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                minLength={10}
                                maxLength={10}
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <label htmlFor="address"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                            <label htmlFor="city"
                                   className="block text-sm font-bold text-gray-700 uppercase tracking-wide">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-5 py-4 rounded-xl border-2 border-purple-100 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                                placeholder="Enter your city"
                            />
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit_Profile
