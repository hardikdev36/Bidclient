import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CategoryIcon from "@mui/icons-material/Category";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VideocamIcon from "@mui/icons-material/Videocam";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import LinkIcon from "@mui/icons-material/Link";
import Back from "../Back_Button/Back.jsx";

const BidRulePage = () => {
    const navigate = useNavigate();

    return (
        <div className="m-[5px] p-6 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full bg-white shadow-md rounded-lg p-6">
                
                <div className="flex justify-between items-center mb-6">
                    <Back />
                    <h2 className="text-xl font-bold text-center flex-grow">
                        Bid Rule Information
                    </h2>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><EditIcon /> Edit Auction</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click this icon to edit auction details like name or points. After auction date has passed, you wont be able to edit auction details.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><DeleteIcon /> Delete Auction</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to delete auction
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><PersonIcon /> Player List</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to see the player list for that auction. You can also add players there.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><PeopleIcon /> Team List</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to see the team list for that auction. You can also add teams there.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><DashboardIcon /> Auction Dashboard</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to open auction dashboard to start bidding. After auction date has passed the dashboard will be accessible for next 2 days to allow you to reassign players to teams. After 2 days have passed, the dashboard will be inaccessible. Important to note that if you lose internet connection while you are on dashboard screen then do not do any operation until the connection is restored. If you do any operation like placing bids or sell player then you will receive an error. Also please do not open dashboard in multiple tabs otherwise you will face issues on overlay screen like same player is showing up again and again.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><DescriptionIcon /> Auction Summary</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to open auction summary page to see team and player details as well as download auction data.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><AssessmentIcon /> Auction Logs</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to set the incremental bid rules for auction. This means lets say until 5000 the bid will increase by the auction bid increase by value i.e. 500 and after 5000 the bid should increase by 1000. You can define such rules here. If no rules are defined then the bid will always increase by the 'Bid Increase By' value given while creating the auction. Rules cannot be added after auction date has passed.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><CategoryIcon /> Custom Categories</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to add custom category for the auction. Custom categories helps you divide players in categories like Gold, Silver and Bronze based on their abilities and past performances. After creating a custom category, you can assign it to a player from the player list page. In dashboard screen, from options tab, You can select a category from dropdown and only players from that category will be shown for bidding. Maximum 15 custom categories can be added per auction.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><MonetizationOnIcon /> Sponsors</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to see the sponsors list for that auction. You can also add sponsors there. BidAthlete ensures that your tournament sponsors gets the best value out of the auction by advertising for them on Summary, Dashboard and Overlay screens. Maximum 15 sponsors can be added per auction.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><RefreshIcon /> Mark Unsold Players</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to mark all unsold players as available again and also make them available for bidding on auction dashboard.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><PersonAddIcon /> Player Registration Form Link</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to copy player registration form link. This can be shared with interested players which they can use to register for that particular auction. Free users can register upto 10 players using player registration form link after that please use player list page or buy more teams to register more players. For paid users there is no limit. Player registration will not be allowed after auction date has passed. Here you can also disable the player registration form if you want to stop accepting new registrations.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><VideocamIcon /> Live Streaming Overlay Link</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to copy auction live streaming overlay link. This can be used on youtube and facebook live. In order for overlay to work properly, the dashboard should be opened only in a single tab. If you open dashboard in more than 1 tab then you will face issues on overlay like same player coming again and again.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><TransferWithinAStationIcon /> Transfer Players</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to transfer players from another auction to that auction. For example you want to transfer players from season 1 auction to season 2 auction as the players are all same and you do not want to register them again then you can use this feature. Important to note that player cannot be transferred after auction date has passed and Only the users who have bought any teams for their auction can use this feature.
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2"><LinkIcon /> Auction Summary Page Link</h3>
                    <p className="text-gray-600 leading-relaxed">
                    Click to copy auction summary page link which can be shared with team owners as well as anyone else who wants to check the player details and status of auction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BidRulePage;