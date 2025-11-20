import {useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Sidebar from './Components/Header/Sidebar';
import { Toaster } from 'react-hot-toast';
import {loggedUser} from "./Service/Authentication_Service.js";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const user = localStorage.getItem("token");
    const [userData, setUserData] = useState(null);

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const hideHeader = location.pathname === "/bidder-auction";

    return (
        <>
            {!hideHeader && (
                <>
                    <Header/>
                </>
            )}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

            <div className={`flex flex-col min-h-screen transition-all duration-300`}>
                <div className="flex-grow">
                    <Toaster position={"bottom-right"}/>
                    <Outlet/>
                </div>
                {!userData && (<Footer />)}
            </div>
        </>
    );
}

export default App;
