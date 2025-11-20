import {loggedUser} from '../../Service/Authentication_Service';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaHome, FaQuestion, FaKey} from "react-icons/fa";
import {TfiWrite} from "react-icons/tfi";
import {RiAuctionFill} from "react-icons/ri";
import {CiSettings} from "react-icons/ci";
import {GrLogout} from "react-icons/gr";

const Header = () => {
    const [userData, setUserData] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const Logged = async () => {
                try {
                    setUserData(await loggedUser());
                } catch (e) {
                    console.log(e.message);
                }
            };
            Logged();
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <header
                className="bg-white shadow-lg w-full fixed top-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex items-center group cursor-pointer">
                            <img
                                src={"https://static.vecteezy.com/system/resources/previews/006/923/598/original/running-man-abstract-logo-free-vector.jpg"}
                                alt="BidAthlete Logo"
                                className="h-12 w-12 mr-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 hover:shadow-blue-200"
                            />
                            <a href="/home"
                               className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300">
                                BidAthlete
                            </a>
                        </div>

                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="/" className="nav-link flex items-center gap-2 hover:scale-105 text-lg">
                                <FaHome/>
                                Home
                            </a>
                            {userData ? (
                                <>
                                    <a href="/my-auction"
                                       className="nav-link flex items-center gap-2 hover:scale-105 text-lg">
                                        <RiAuctionFill/>
                                        Auction
                                    </a>
                                    <a href="/profile"
                                       className="nav-link flex items-center gap-2 hover:scale-105 text-lg">
                                        <CiSettings/>
                                        Profile
                                    </a>
                                    <button onClick={handleLogout}
                                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href="/faqs" className="nav-link flex items-center gap-2 hover:scale-105 text-lg">
                                        <FaQuestion/>
                                        FAQs
                                    </a>
                                    <a href="/sign-up"
                                       className="nav-link flex items-center gap-2 hover:scale-105 text-lg">
                                        <TfiWrite/>
                                        Sign Up
                                    </a>
                                    <a href="/login"
                                       className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                                        Login
                                    </a>
                                </>
                            )}
                        </nav>

                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div
                                className="px-4 pt-3 pb-4 my-4 space-y-3 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl mt-3 border border-gray-100">
                                <a href="/home" className="mobile-nav-link group flex items-center gap-1 text-lg">
                                    <FaHome/>
                                    <span>Home</span>
                                </a>
                                {userData ? (
                                    <>
                                        <a href="/my-auction"
                                           className="mobile-nav-link group flex items-center gap-1 text-lg">
                                            <RiAuctionFill/>
                                            <span>Auction</span>
                                        </a>
                                        <a href="/profile"
                                           className="mobile-nav-link group flex items-center gap-1 text-lg">
                                            <CiSettings/>
                                            <span>Profile</span>
                                        </a>
                                        <button onClick={handleLogout}
                                                className="gap-1 text-lg w-full text-left px-1 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center group">
                                            <GrLogout/>
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="/faqs"
                                           className="mobile-nav-link group flex items-center gap-1 text-lg">
                                            <FaQuestion/>
                                            <span>FAQs</span>
                                        </a>
                                        <a href="/sign-up"
                                           className="mobile-nav-link group flex items-center gap-2 text-lg">
                                            <TfiWrite/>
                                            <span>Sign Up</span>
                                        </a>
                                        <a href="/login"
                                           className="mobile-nav-link group flex items-center text-blue-600 font-semibold gap-2 text-lg">
                                            <FaKey/>
                                            <span>Login</span>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <style>{`
                .nav-link {
                    @apply text-gray-700 hover:text-blue-600 transition-all duration-300 hover:underline decoration-blue-600 decoration-2 underline-offset-4 font-medium;
                }
                .mobile-nav-link {
                    @apply block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium;
                }
            `}</style>
            <div className="h-16"></div>
        </div>
    );
};

export default Header;