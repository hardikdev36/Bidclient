import {useState, useEffect} from 'react';
import {useNavigate, useLocation, useSearchParams, data} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {getAllAuction, getAuctionByCreatedBy, getAuctionById} from "../../Service/Auction_Service.js";
import {fetchTeams} from "../../Service/Team_Service.js";
import {loggedUser} from "../../Service/Authentication_Service.js";

// eslint-disable-next-line react/prop-types
const Sidebar = ({isSidebarOpen, toggleSidebar}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const auctionId = searchParams.get('auctionId');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const hideHeader = location.pathname === "/bidder-auction";
    const username = localStorage.getItem("username");

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

    useEffect(() => {
        if (location.pathname === '/auction') {
            const teams = async () => {
                try {
                    const fetchAuction = async () => {
                        try {
                            const responseAuc = await getAuctionById(auctionId);
                            const responseTeam = await fetchTeams(responseAuc.auctionId);
                            const teamsNames = responseTeam?.map(team => team.name);
                            setDropdownItems(teamsNames);
                        } catch (error) {
                            console.error('Error fetching auction:', error);
                        }
                    };
                    fetchAuction();
                } catch (e) {
                    console.log(e);
                }
            }
            teams();
        } else {
            const auctions = async () => {
                try {
                    const response = await getAuctionByCreatedBy(username);
                    const auctionNames = response?.data?.map(auction => ({_id: auction._id, name: auction.name}));
                    setDropdownItems(auctionNames);
                } catch (e) {
                    console.log(e);
                }
            }
            auctions();
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const handleLogin = () => {
        navigate("/login");
    }

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <button
                onClick={toggleSidebar}
                className={`fixed bottom-3 z-50 bg-blue-600 text-white p-2 rounded-r-md shadow-lg hover:bg-blue-700 transition-all duration-300 ${
                    isSidebarOpen ? "left-64" : "left-0"
                }`}
            >
                {isSidebarOpen ? <ArrowBackIcon/> : <ArrowForwardIcon/>}
            </button>

            <div
                className={`fixed ${hideHeader ? "top-0 h-full" : "top-16"} left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } w-64`}
            >
                <div className="flex items-center justify-between p-4 bg-blue-600">
                    <h2 className="text-xl font-bold text-white">
                        {location.pathname === "/auction" ? "Teams" : "Auctions"}
                    </h2>
                </div>

                <nav className="mt-4">
                    <ul className="space-y-3 px-4">
                        <li>
                            <button
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                                aria-controls="dropdown-menu"
                                className="w-full flex items-center justify-between text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded px-4 py-2 transition duration-200"
                            >
                                {location.pathname === '/auction' ? 'Teams' : 'Auctions'}
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <ul
                                    id="dropdown-menu"
                                    className="mt-2 space-y-2 pl-4"
                                >
                                    {location.pathname === '/auction' ?
                                        dropdownItems.map((item, idx) => (
                                            <li key={idx}>
                                                <p
                                                    className="block text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded px-4 py-2 transition duration-200"
                                                >
                                                    {item}
                                                </p>
                                            </li>
                                        ))
                                        : dropdownItems.map((item, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={`auction?auctionId=${item._id}`}
                                                    className="block text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded px-4 py-2 transition duration-200"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </li>

                        <li>
                            {userData ? <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded px-4 py-2 transition duration-200"
                                >
                                    Logout
                                </button> :
                                <button
                                    onClick={handleLogin}
                                    className="w-full text-left text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded px-4 py-2 transition duration-200"
                                >
                                    Login
                                </button>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;