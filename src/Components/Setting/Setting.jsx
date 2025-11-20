import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { autoSelectUnsoldPlayer, findAuctionByAuctionId } from "../../Service/Auction_Service.js";
import toast from "react-hot-toast";
import Back from "../Back_Button/Back.jsx";
import {loggedUser} from "../../Service/Authentication_Service.js";

const SettingPage = () => {
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("general");
    const [auction, setAuction] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    let auctionCId;
    if (window?.location?.hash) {
        const hash = window.location.hash.substring(1);
        const decodedData = JSON.parse(atob(hash));
        auctionCId = decodedData.auctionCId;
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await loggedUser();
                if (!user) {
                    toast.error("Please Login First!");
                    navigate("/");
                }
            } catch (e) {
                console.log(e.message);
                toast.error("Please Login First!");
                navigate("/");
            }
        };
        fetchUserData();

        const auctionData = async () => {
            try {
                const response = await findAuctionByAuctionId(auctionCId);
                setAuction(response);
                setIsOn(response.autoSelectUnsold || false);
            } catch (error) {
                console.log(error);
            }
        };
        auctionData();
    }, []);

    const menuOptions = [
        { id: "general", label: "General Settings" },
        { id: "auto-select-unsold", label: "Auto Select Unsold" },
        { id: "bidding", label: "Bidding Rules" },
    ];

    const handleToggle = async () => {
        const newIsOn = !isOn;
        setIsOn(newIsOn);
        try {
            const response = await autoSelectUnsoldPlayer(auctionCId, newIsOn);
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "auto-select-unsold":
                return (
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Auto Select Unsold</h3>
                        <p className="text-sm md:text-base">
                            Auto select unsold players when all players are sold in the auction.
                        </p>
                        <label className="inline-flex items-center cursor-pointer mt-4">
                            <input
                                type="checkbox"
                                value={isOn}
                                checked={isOn}
                                onChange={handleToggle}
                                className="sr-only peer"
                            />
                            <div
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                            />
                            <span className="ml-3 text-sm md:text-base font-medium text-gray-900 dark:text-gray-300">
                                {isOn ? "On" : "Off"}
                            </span>
                        </label>
                    </div>
                );
            case "general":
                return (
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">General Settings</h3>
                        <p className="text-sm md:text-base">Configure basic auction settings here.</p>
                    </div>
                );
            case "bidding":
                return (
                    <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-4">Bidding Rules</h3>
                        <p className="text-sm md:text-base">Set rules for bidding increments and limits.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-4 md:p-6">
            <div className="w-full bg-white shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden relative">

                <button
                    className="md:hidden p-4 text-blue-600 focus:outline-none"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                <div
                    className={`w-3/4 md:w-1/4 border-r md:border-r-gray-200 p-4 md:pr-4 bg-white absolute md:static z-20 transition-transform duration-300 ease-in-out transform ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
                >
                    <ul className="space-y-2">
                        {menuOptions.map((option) => (
                            <li key={option.id}>
                                <button
                                    onClick={() => {
                                        setSelectedMenu(option.id);
                                        setIsSidebarOpen(false); // Close sidebar on selection
                                    }}
                                    className={`w-full text-left py-2 px-4 rounded text-sm md:text-base ${
                                        selectedMenu === option.id
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-200"
                                    } transition-colors`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <div className="w-full md:w-3/4 p-4 md:pl-6 flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
                        <Back />
                        <h2 className="text-lg md:text-xl font-bold text-center flex-grow">
                            Auction Settings of {auction?.name}
                        </h2>
                    </div>

                    <div className="mt-4">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;