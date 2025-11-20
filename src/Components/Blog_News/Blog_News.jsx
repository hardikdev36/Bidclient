import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Blog_News = () => {
    const navigate = useNavigate();

    const posts = [
        {
            id: 1,
            title: "APL2025 Auction Kicks Off with a Bang!",
            excerpt: "The APL2025 auction started with record-breaking bids and exciting team builds. Check out the highlights from Day 1!",
        },
        {
            id: 2,
            title: "Top 5 Tips for Winning Your Next Bid",
            excerpt: "New to Bid Athlete? Here are five expert tips to help you snag your favorite players in our auctions.",
        },
        {
            id: 3,
            title: "Meet the New Teams Joining Bid Athlete",
            excerpt: "We’re thrilled to welcome three new teams to the platform. Learn more about their players and strategies!",
        },
        {
            id: 4,
            title: "How Bid Athlete is Changing Fantasy Sports",
            excerpt: "Discover how our unique bidding system is revolutionizing the way fans play fantasy sports.",
        },
    ];

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
                        Blog & News
                    </h1>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-8">
                    Stay updated with the latest news, tips, and stories from Bid Athlete!
                </p>

                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                                    {post.title}
                                </h2>
                                <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4">
                                    {post.excerpt}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">
                        No posts available yet. Check back soon!
                    </p>
                )}

                <div className="text-center mt-8">
                    <p className="text-sm sm:text-base md:text-lg text-gray-700">
                        Want more updates? Follow us on social media or check back here regularly!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog_News;