import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import MyAuction from './Components/Auction/My_Auction.jsx'
import NewAuction from './Components/Auction/New_Auction.jsx'
import Edit_Profile from './Components/Profile/Edit_Profile.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Player from './Components/Player/Player.jsx'
import Sign_up from './Components/Sign up/Sign_up.jsx'
import Login from './Components/Login/Login.jsx'
import BidderAuction from './Components/Bidder/BidderAuction.jsx'
import ParticularAuction from './Components/Auction/PerticularAuction.jsx'
import SponsorsList from './Components/Sponsor/View_Sponsors.jsx'
import TeamList from './Components/Team/View_Teams.jsx'
import AddSponsor from './Components/Sponsor/Add_Sponsor.jsx'
import AddTeam from './Components/Team/Add_Teams.jsx'
import AddEditPlayer from './Components/Player/AddEdit_Player.jsx'
import BidRulePage from './Components/Bid_Rule/Bid_Rule.jsx'
import SettingPage from "./Components/Setting/Setting.jsx";
import AuctionSummaryPage from "./Components/Auction/Auction_Summary.jsx";
import FAQs from "./Components/FAQs/FAQs.jsx";
import Privacy_Policies from "./Components/Privacy_Policies/Privacy_Policies.jsx";
import Terms_Conditions from "./Components/Terms_Condition/Terms_Condition.jsx";
import Blog_News from "./Components/Blog_News/Blog_News.jsx";
import About_Us from "./Components/About_Us/About_Us.jsx";
import ContactUs from "./Components/Contact_Us/Contact_Us.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/my-auction' element={<MyAuction />} />
      <Route path='/create-auction' element={<NewAuction />} />
      <Route path='/edit-profile' element={<Edit_Profile />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/player' element={<Player />} />
      <Route path='/sign-up' element={<Sign_up />} />
      <Route path='/bidder-auction' element={<BidderAuction />} />
      <Route path='/auction' element={<ParticularAuction />} />
      <Route path='/sponsors' element={<SponsorsList />} />
      <Route path='/add-sponsors' element={<AddSponsor />} />
      <Route path='/teams' element={<TeamList />} />
      <Route path='/add-teams' element={<AddTeam />} />
      <Route path='/add-edit-player' element={<AddEditPlayer />} />
      <Route path='/bid-rule' element={<BidRulePage />} />
      <Route path='/setting' element={<SettingPage />} />
      <Route path='/auction-summary' element={<AuctionSummaryPage />} />
      <Route path='/faqs' element={<FAQs />} />
      <Route path='/privacy-policies' element={<Privacy_Policies />} />
      <Route path='/terms-condition' element={<Terms_Conditions />} />
      <Route path='/blog-news' element={<Blog_News />} />
      <Route path='/about-us' element={<About_Us />} />
      <Route path='/contact-us' element={<ContactUs />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
