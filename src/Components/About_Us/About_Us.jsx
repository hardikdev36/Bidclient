import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AboutUs = () => {
    const navigate = useNavigate();

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
                        About Bid Athlete
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12">
                    <div className="md:w-1/2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4">
                            Empowering Sports Fans to Build Dream Teams
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4">
                            Discover the ultimate platform for sports enthusiasts to bid on their favorite athletes and
                            create winning teams. At Bid Athlete, we’ve been transforming the way fans engage with
                            fantasy sports, offering a thrilling auction experience tailored to your passion.
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            Whether you’re a casual fan or a die-hard strategist, our innovative bidding system ensures
                            you find the perfect players to connect, compete, and succeed. Join our growing community
                            today!
                        </p>
                    </div>

                    <div className="md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                            alt="Team collaborating in a modern workspace"
                            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center mb-4">
                        Bid Athlete Design Philosophy
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 text-center mb-8">
                        Bid Athlete was created to bring sports fans together through exciting auctions. We believe in
                        building a platform that’s easy to use, engaging, and helps you create your dream team while
                        connecting with a passionate community!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                        <div className="bg-blue-500 rounded-lg p-4 shadow-md">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-800 font-bold">🏟️</span>
                                </div>
                                <h3 className="text-sm text-white sm:text-base md:text-lg font-semibold">
                                    Seamless Auctions
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-white">
                                Our platform offers a smooth bidding experience, with real-time updates and easy
                                navigation to help you focus on building your team.
                            </p>
                        </div>

                        <div className="bg-blue-500 rounded-lg p-4 shadow-md">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-800 font-bold">🎉</span>
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                                    Engaging Experience
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-white">
                                We make auctions fun and interactive, with features like live stats and player insights
                                to keep you engaged every step of the way.
                            </p>
                        </div>

                        <div className="bg-blue-500 rounded-lg p-4 shadow-md">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-800 font-bold">📱</span>
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                                    Mobile-Friendly Design
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-white">
                                Bid on the go with our responsive design, ensuring you never miss an auction whether
                                you’re on your phone, tablet, or desktop.
                            </p>
                        </div>

                        <div className="bg-blue-500 rounded-lg p-4 shadow-md">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gray-800 font-bold">🔒</span>
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                                    Secure Transactions
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base text-white">
                                Your payments and data are safe with us, thanks to our secure systems and trusted
                                payment partners.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            to="/contact-us"
                            className="inline-block  px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                        alt="Community of sports fans"
                        className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;