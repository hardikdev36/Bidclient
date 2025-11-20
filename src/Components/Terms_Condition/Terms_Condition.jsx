import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const Terms_Conditions = () => {
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
                        Terms & Conditions for Bid Athlete
                    </h1>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
                    Welcome to Bid Athlete! These Terms & Conditions ("Terms") explain the rules for using our website (<a
                    href="https://bid-athlete.vercel.app/home" className="text-blue-600 hover:underline" target="_blank"
                    rel="noopener noreferrer">Bid Athlete</a>). By using our site, you agree to follow these
                    rules. Please read them carefully.
                </p>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        1. Who Can Use Bid Athlete
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        You must be at least 13 years old to use our site. If you’re under 18, you need permission from
                        a parent or guardian. By using Bid Athlete, you promise you meet these rules.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        2. How Our Service Works
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Bid Athlete lets you bid on athletes to build your dream sports team. You can:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Create an account to join auctions.</li>
                        <li>Place bids using real money or points (as per our rules).</li>
                        <li>View team stats and auction updates.</li>
                    </ul>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        We can change how auctions work or stop them anytime without telling you first.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        3. Your Account
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        To use Bid Athlete, you need an account. You agree to:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Give true and correct info when signing up.</li>
                        <li>Keep your password safe and not share it.</li>
                        <li>Tell us if someone else uses your account without permission.</li>
                    </ul>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        We can suspend or delete your account if you break these rules.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        4. Bidding and Payments
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        When you bid:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>All bids are final—you can’t cancel them.</li>
                        <li>You must pay for any winning bids using our payment system.</li>
                        <li>No refunds unless we say so (e.g., if an auction is canceled).</li>
                        <li>We use trusted payment partners, and extra fees (like taxes) may apply.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        5. Your Responsibilities
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Use Bid Athlete for anything illegal.</li>
                        <li>Cheat or trick the bidding system.</li>
                        <li>Post fake info or harm other users.</li>
                        <li>Copy or steal our website content.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        6. Our Rights
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We own Bid Athlete and its content (like logos, text, and designs). You can’t use it without our
                        permission. We can also:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Stop or change the site anytime.</li>
                        <li>Remove your account if you break these Terms.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        7. Limits of Responsibility
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We try to make Bid Athlete great, but:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>We’re not responsible if the site goes down or has errors.</li>
                        <li>We don’t promise you’ll win every bid or like every result.</li>
                        <li>We’re not liable for losses from using our site (like money or time lost).</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        8. Changes to These Terms
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We might update these Terms. If we do, we’ll post the new version here and update the “Last
                        Updated” date. Check back sometimes!
                    </p>
                </section>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center">
                    Thanks for using Bid Athlete! Let’s build some awesome teams together!
                </p>
            </div>
        </div>
    );
};

export default Terms_Conditions;