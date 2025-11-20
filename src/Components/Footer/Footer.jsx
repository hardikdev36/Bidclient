
const Footer = () => {

    return (
        <footer className="text-gray-600 body-font">
            <div
                className="container px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <img
                            src={"https://static.vecteezy.com/system/resources/previews/006/923/598/original/running-man-abstract-logo-free-vector.jpg"}
                            alt="BidAthlete Logo"
                            className="h-12 w-12 mr-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 hover:shadow-blue-200"
                        />
                        <span
                            className="ml-3 font-extrabold text-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent hover:from-blue-500 hover:via-blue-600 hover:to-blue-700"
                        >BidAthlete</span>
                    </a>
                    <p className="mt-2 text-sm text-gray-500">A website where sports fans can bid on players to create
                        their favorite teams easily.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">AUTHENTICATION</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href={"/"} className="text-gray-600 hover:text-gray-800">Home</a>
                            </li>
                            <li>
                                <a href={"/login"} className="text-gray-600 hover:text-gray-800">Login</a>
                            </li>
                            <li>
                                <a href={"/sign-up"} className="text-gray-600 hover:text-gray-800">Sign Up</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">BID
                            ATHLETE</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href={"/faqs"} className="text-gray-600 hover:text-gray-800">FAQs</a>
                            </li>
                            <li>
                                <a href={"/about-us"} className="text-gray-600 hover:text-gray-800">About Us</a>
                            </li>
                            <li>
                                <a href={"/contact-us"} className="text-gray-600 hover:text-gray-800">Contact Us</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">YOUR
                            SATISFACTION</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <a href={"/privacy-policies"} className="text-gray-600 hover:text-gray-800">Privacy Polices</a>
                            </li>
                            <li>
                                <a href={"/terms-condition"} className="text-gray-600 hover:text-gray-800">Terms & Condition</a>
                            </li>
                            <li>
                                <a href={"/blog-news"} className="text-gray-600 hover:text-gray-800">Blogs & News</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 BidAthlete —
                        <a href="https://durvasainfotech.com/" rel="noopener noreferrer" className="text-gray-600 ml-1"
                           target="_blank">@ Durvasa Infotech</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a href={"https://www.facebook.com/DurvasaInfotech"} className="text-gray-500">
                          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                               className="w-5 h-5"
                               viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                          </svg>
                        </a>
                        <a href={"https://www.instagram.com/durvasaInfotech"} className="ml-3 text-gray-500">
                          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                               strokeWidth="2"
                               className="w-5 h-5" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                          </svg>
                        </a>
                        <a href={"https://www.linkedin.com/company/durvasainfotech/posts/?feedView=all"} className="ml-3 text-gray-500">
                          <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                               strokeWidth="0"
                               className="w-5 h-5" viewBox="0 0 24 24">
                            <path stroke="none"
                                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                            <circle cx="4" cy="4" r="2" stroke="none"></circle>
                          </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;