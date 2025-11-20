import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Back from "../Back_Button/Back.jsx";

const FAQsPage = () => {
    return (
        <div className="m-[5px] p-6 bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full bg-white shadow-md rounded-lg p-6">

                <div className="flex justify-between items-center mb-6">
                    <Back/>
                    <h2 className="text-xl font-bold text-center flex-grow">
                        Frequently Asked Questions
                    </h2>
                </div>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">I sold a player by mistake, how to undo it?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        You can undo the sold/unsold player by following the below steps:<br/>
                        1) Go to Player list page<br/>
                        2) For each player you will find five options on the left in the data table.<br/>
                        3) Click on fourth option from left i.e. "Mark this player as available from sold/unsold" and
                        click Ok.<br/>
                        4) Now this player will again be available for bidding in the dashboard.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">What are reserve points and max bid points in
                            BidAthlete?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Reserve points has been introduced to stop team owners from spending all their points on a
                        single player. This helps teams in buying the required number of players to participate in the
                        tournament. Below you can find how reserve points are calculated :
                        <br/><br/>
                        1) Max Points - Total points available for each team to bid on players
                        <br/><br/>
                        2) Points Available - Total points available for bidding after purchasing the players i.e. (Max
                        points - sum of player's selling price)
                        <br/><br/>
                        3) Max Bid Points - Maximum bidding that a team can make on a player. It is calculated as
                        (Points available - Reserve points)
                        <br/><br/>
                        4) Reserve Points - Some points out of the total points are reserved so that a team can purchase
                        the required number of players. Reserve points are calculated as ((remaining number of players -
                        1) * minimum bid of auction)
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Will my auction work after 12 mid-night on auction
                            date?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Yes the auction will work after 12 mid-night on the auction date. The dashboard screen is
                        available for 2 days after auction date so that the users can do the bidding or reassign players
                        in case they need to.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Can the dashboard screen be customized?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Sorry the dashboard screen is same for all users and cannot be customized for individual users.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">How to change/set base price of each player?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        You can change or set base price of each player by following the below steps:<br/>
                        1) Go to Player list page<br/>
                        2) For each player you will find five options on the left in the data table.<br/>
                        3) Click on fifth option from left i.e. "Change Minimum Bid", after that a popup will open where
                        you can enter the new minimum bid amount.<br/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">what are incremental bid rules and How to add them for the
                            auction?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        You can add incremental bid rules from the auction list page("My Auctions") by clicking on this
                        icon (Auction Setting Icon).
                        <br/> <br/>
                        Incremental bid rules helps you increase the bid amount after a certain limit. Lets say till
                        5000 you want the bid to increase by 500 and after 5000 you want it to increase by 1000. Then
                        you can define such rules using Incremental bid rules.
                        <br/> <br/>
                        If no rules are added then the bid will always increase by the 'Bid Increase By' value given
                        while creating the auction.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">What are the player addition limits for free users?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        There is no limit for player registration using "Add Player" from the player list page for free
                        users.
                        <br/> <br/>
                        However there are limits on using few features as follows:<br/>
                        1) Only 10 players can register using player registration form link for free users.<br/>
                        2) Free users can only add upto 30 players using bulk upload.
                        <br/> <br/>
                        To remove the above limits, the user needs to buy teams. After teams are bought, all the limits
                        are removed.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">what are custom categories and How to add them for the
                            auction?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Custom categories helps you divide players in categories like Gold, Silver and Bronze based on
                        their abilities and past performances.
                        <br/><br/>
                        You can add custom categories from the auction list page("My Auctions") by clicking on this icon
                        (). After adding custom categories on this page, you need to go to 'Player List' page and assign
                        each player to the category you want.
                        <br/><br/>
                        In the dashboard screen, Go to 'OPTIONS' tab from the top of page and choose the category of
                        players you want to do auction for. After selecting category, only players from that category
                        will be shown for bidding on dashboard. If 'All' is selected then no category filter will be
                        applied and all players will be shown and will be available for bidding.
                        <br/><br/>
                        By default, when you open the dashboard, all players will be shown and will be available for
                        bidding. Then you can select the category and filter the players as you want.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">What is the validity of the teams that I buy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        The teams that you buy are valid per auction and until the auction date. For a new auction, you
                        will again have to buy new teams.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">How long auction data is available?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        The auction data is available until 3 months after the auction date. After 3 months, the data
                        will be deleted. Please take backup of the auction data from summary page if you need it for
                        more than 3 months.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">Can I transfer teams to another auction?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Sorry teams are not transferrable. You will again have to buy teams for a new auction.
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span">How to add payment information to the player registration
                            form?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        Adding payment information to the player registration form helps you accept payment from the
                        players when they register for the tournament. This feature makes it mandatory for the players
                        to upload payment screenshot while registering otherwise they will not be able to register for
                        the tournament.
                        <br/><br/>
                        It includes the below steps:
                        <br/><br/>
                        1) Add payment information from player registration form popup on "My Auctions" page. After
                        adding payment information, it will be visible on the player registration form and will make it
                        mandatory for the player to upload the payment screenshot. If no payment information is present
                        for the auction then uploading payment picture will not be mandatory.<br/>
                        2) Share the link of the player registration form with the players and ask them to register
                        after making payment and uploading the screenshot.<br/>
                        3) Once the player has registered, you can see the registered player's details along with
                        payment picture(by clicking on this icon for each player) on the player list page.
                        <br/><br/>
                        You can edit and delete the payment information from the same player registration popup on "My
                        Auctions" page.
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default FAQsPage