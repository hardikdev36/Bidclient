import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {loggedUser} from "../../Service/Authentication_Service.js";

const Home = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const features = [
        {
            icon: "https://img.icons8.com/color/96/000000/video.png",
            title: "Live Streaming",
            description: "We provide live streaming overlay for youtube, facebook",
        },
        {
            icon: "https://img.icons8.com/?size=100&id=OAs4QZ2x4zyX&format=png&color=000000",
            title: "Team Owner View",
            description: "All team owner can live view points, player profile on there mobiles",
        },
        {
            icon: "https://img.icons8.com/color/96/hammer.png",
            title: "Remotely Bid",
            description: "We provide remotely bidding system in this application for team owner they take bid from the mobile or laptop",
        },
        {
            icon: "https://img.icons8.com/color/96/000000/add-user-male.png",
            title: "Player Registration",
            description: "Player can register own self from the mobile app",
        },
        {
            icon: "https://img.icons8.com/color/96/000000/whatsapp.png",
            title: "WhatsApp Message",
            description: "Player will get personal WhatsApp message after sold",
        },
        {
            icon: "https://img.icons8.com/color/96/000000/ferris-wheel.png",
            title: "Fortune Wheel",
            description: "Fortune wheel designed to provide a fortune for the lucky draw between the teams",
        },
        {
            icon: "https://img.icons8.com/color/96/000000/paint-palette.png",
            title: "Customizable Themes",
            description: "You can customize different themes with different looking layouts backgrounds etc.",
        },
        {
            icon: "https://img.icons8.com/color/96/000000/sparkler.png",
            title: "Customizable Effects",
            description: "You can choose different sound effects like fireworks, Audio etc.",
        },
    ];

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const fetchLoggedUser = async () => {
                try {
                    setUserData(await loggedUser());
                } catch (e) {
                    console.log(e.message);
                }
            };
            fetchLoggedUser();
        }
    }, []);

    const handleAuction = () => {
        navigate('/my-auction');
    };

    const handleAboutUs = () => {
        navigate('/about-us');
    };

    const handleBlogNews = () => {
        navigate('/blog-news');
    };

    return (
        <div className="relative min-h-screen overflow-hidden">

            <div className="relative min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/035/306/251/non_2x/ai-generated-a-young-athlete-preparing-for-a-run-on-a-sunrise-background-generative-ai-photo.jpg')`,
                        filter: 'brightness(50%) contrast(110%)',
                        backgroundPosition: 'center 20%',
                    }}
                ></div>

                <section
                    className="relative z-10 h-screen flex flex-col justify-center items-center text-white text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-down drop-shadow-lg">
                        Bid Athlete: The Ultimate Player Auction Platform
                    </h1>

                    <p className="text-lg md:text-2xl font-light mb-8 max-w-3xl animate-fade-in-up delay-200">
                        Revolutionizing sports auctions for Cricket, Football, Kabaddi, Volleyball & more. <br/>
                        <span className="font-bold">1000+ Auctions</span> completed across 14 countries. Join now!
                    </p>

                    {userData ? (
                        <div className="animate-fade-in-up delay-400">
                            <button
                                onClick={handleAuction}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                aria-label="View My Auctions"
                            >
                                My Auctions
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-4 animate-fade-in-up delay-400">
                            <button
                                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-100"
                                onClick={() => navigate('/sign-up')}
                                aria-label="Register Now"
                            >
                                Register Now
                            </button>
                            <button
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold transform transition-all duration-300 hover:bg-white hover:text-blue-600"
                                onClick={() => navigate('/about-us')}
                                aria-label="Learn More About Us"
                            >
                                Learn More
                            </button>
                        </div>
                    )}

                    <div className="absolute bottom-10 left-10 animate-bounce-slow">
                        <img
                            src="https://th.bing.com/th/id/R.fe28d316d505d730cbb441710d3467a0?rik=qeUoxi6PiY2rfg&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fartua%2fsoccer%2f512%2ffootball-icon.png&ehk=5C8pWuIEMUCA1Ir9K90sUf3RYbgzMGa%2fGg0tQeSdaKc%3d&risl=&pid=ImgRaw&r=0"
                            alt="Football Icon"
                            className="w-12 h-12 opacity-80"
                        />
                    </div>
                    <div className="absolute bottom-20 right-10 animate-bounce-slow delay-200">
                        <img
                            src="https://pngimg.com/uploads/cricket/cricket_PNG120.png"
                            alt="Cricket Ball Icon"
                            className="w-12 h-12 opacity-80"
                        />
                    </div>
                </section>
            </div>

            {/* About Section */}
            <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 px-4 sm:px-6 py-20">
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 px-4">
                    <img
                        src="https://th.bing.com/th/id/OIP.X5Wqs5MuXp3VbPjMyKP5wgHaFj?rs=1&pid=ImgDetMain"
                        alt="Team collaborating"
                        className="rounded-3xl shadow-lg w-full max-w-md h-auto object-cover"
                    />
                </div>
                <div className="md:w-1/2 flex flex-col justify-center px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 text-center md:text-left">
                        About Bid Athlete
                    </h1>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">●</span>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Who We Are</h2>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                    Bid Athlete is a leading sports auction platform, connecting talent with
                                    opportunities in Cricket, Football, Kabaddi, Volleyball, and more, across 14
                                    countries.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">●</span>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Our Mission</h2>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                    We empower athletes and teams by providing a seamless, transparent auction
                                    experience, fostering growth, fairness, and success in the sports industry.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button
                            onClick={handleAboutUs}
                            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-14 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="flex flex-col md:flex-row items-center justify-center bg-white px-4 sm:px-6 py-20">
                <div className="md:w-1/2 flex flex-col justify-center px-4 sm:px-6 order-2 md:order-1">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 text-center md:text-left">
                        Latest Sports Insights
                    </h1>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">●</span>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Highlights</h2>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                    Stay updated with the latest auction highlights, including top bids and emerging
                                    talents in Cricket, Football, and more.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">●</span>
                            <div>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Tips & Strategies</h2>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                    Learn expert strategies to maximize your auction success, from bidding tactics to
                                    talent scouting.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button
                            onClick={handleBlogNews}
                            className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-14 py-3 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                            Explore Blog
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 px-4 order-1 md:order-2">
                    <img
                        src="https://img.freepik.com/premium-vector/gradient-sports-news-background_23-2151509020.jpg?w=900"
                        alt="Sports event"
                        className="rounded-3xl shadow-lg w-full max-w-md h-auto object-cover"
                    />
                </div>
            </div>

            {/* Advanced Features */}
            <div className="bg-gray-50 py-12 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">
                    Advanced Features
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-12"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={feature.icon}
                                alt={`${feature.title} Icon`}
                                className="w-16 h-16 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-center text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;