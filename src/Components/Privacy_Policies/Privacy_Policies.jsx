import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const Privacy_Policies = () => {
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
                        Privacy Policy for Bid Athlete
                    </h1>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
                    Welcome to Bid Athlete! We care about your privacy and want you to know how we collect, use, and
                    protect your information when you use our website
                    (<a href="https://bid-athlete.vercel.app/home" className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer">Bid Athlete</a>). By using our site, you agree to this Privacy Policy.
                    Please read it carefully.
                </p>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        1. What Information We Collect
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We collect some information to help you bid on players and enjoy our services:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li><strong>Personal Info:</strong> Like your name, email, address, and phone number when you
                            sign up or bid.
                        </li>
                        <li><strong>Payment Info:</strong> Like credit card details when you pay (we don’t store this
                            ourselves; our payment partners handle it).
                        </li>
                        <li><strong>Usage Info:</strong> Like what pages you visit, what you bid on, and your IP address
                            (to know where you’re connecting from).
                        </li>
                        <li><strong>Cookies:</strong> Small files we use to make the site work better and show you
                            relevant ads.
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        2. How We Use Your Information
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We use your info to:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Let you bid on players and build your team.</li>
                        <li>Process your payments safely.</li>
                        <li>Send you updates about auctions, new features, or special offers (you can stop these
                            anytime).
                        </li>
                        <li>Make our website better and fix problems.</li>
                        <li>Show you ads that match your interests.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        3. Who We Share Your Information With
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We don’t sell your info, but we share it with:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li><strong>Trusted Partners:</strong> Like payment processors or companies that help us run the
                            site (they follow strict privacy rules).
                        </li>
                        <li><strong>Legal Needs:</strong> If the law asks us to share it (e.g., for taxes or safety
                            reasons).
                        </li>
                        <li><strong>Third-Party Ads:</strong> Some ad companies might use cookies to show you ads based
                            on what you like (see Section 6 to opt out).
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        4. How We Keep Your Information Safe
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We use strong security like encryption to protect your info, but no website is 100% safe. We do
                        our best to keep it secure.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        5. Your Choices
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        You can:
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm md:text-base text-gray-600 mt-2">
                        <li>Update or delete your account info by logging in or emailing us at <a href="#"
                                                                                                  className="text-blue-600 hover:underline">support@bidathlete.com</a>.
                        </li>
                        <li>Stop getting emails by clicking “unsubscribe” in any email we send.</li>
                        <li>Ask us what info we have about you or tell us to delete it (email us!).</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        6. Cookies and Ads
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We use cookies to make the site work and show ads. You can turn off cookies in your browser
                        settings, but some parts of the site might not work. To stop personalized ads,
                        visit <a href="#"
                                 className="text-blue-600 hover:underline">Network
                        Advertising Initiative</a> or <a href="#" className="text-blue-600 hover:underline">Digital
                        Advertising Alliance</a>.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        7. Where Your Info Goes
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Your info might be stored or processed in other countries (like the USA) where our servers are.
                        By using Bid Athlete, you agree to this.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        8. Kids Under 13
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        Our site isn’t for kids under 13. If we find out we have info from a child under 13, we’ll
                        delete it.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        9. Changes to This Policy
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        We might update this policy. If we do, we’ll post the new version here and change the “Last
                        Updated” date. Check back sometimes!
                    </p>
                </section>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center">
                    Thanks for trusting Bid Athlete!
                </p>
            </div>
        </div>
    );
};

export default Privacy_Policies;