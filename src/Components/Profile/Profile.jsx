import React, {useState, useEffect} from 'react'
import {loggedUser} from '../../Service/Authentication_Service';
import Back from "../Back_Button/Back.jsx";
import Loader from "../Loader/Loader.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await loggedUser();
                if (!user) {
                    toast.error("Please Login First!");
                    navigate("/");
                } else {
                    setUserData(user);
                }
            } catch (e) {
                console.log(e.message);
                toast.error("Please Login First!");
                navigate("/");
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <Loader/>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 py-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-10">
                <div className="mb-12 text-center">

                    <div className="flex">
                        <Back />
                    </div>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                        Profile
                    </h2>
                    <p className="text-gray-600">Your Profile Information</p>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <img
                                src={userData.photo || "https://th.bing.com/th/id/OIP.nZ0mlqfGSlnx4w5Nr6Aw_QHaHa?rs=1&pid=ImgDetMain"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {userData.fullName}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Username</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {userData.username}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {new Date(userData.dob).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {userData.phoneNumber}
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700">Address</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {userData.address}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">City</label>
                            <div
                                className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white/50 backdrop-blur-sm">
                                {userData.city}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <a
                            href={`/edit-profile?id=${userData._id}`}
                            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-[1.02] transition-all duration-200"
                        >
                            Edit Profile
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
