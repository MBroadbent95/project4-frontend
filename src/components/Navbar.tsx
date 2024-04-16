import { Link, useNavigate } from "react-router-dom";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { IUser } from "../interfaces/user";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
    user: null | IUser;
    setUser: Function;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ion-icon": any;
        }
    }
}

function Navbar({ user, setUser }: NavbarProps) {
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    }
    console.log("User prop in Navbar:", user);
    return (
        <>
            <header className="bg-white shadow-md py-2">
                <nav className="flex justify-between items-center w-[92%] mx-auto pb-8">
                    <div className="flex items-center">
                        <img
                            className="w-16 mt-2 mr-4"
                            src="../src/assets/bbtransparentbg.png"
                            alt="Bootcamp Buddy Logo"
                        />
                        <div
                        // className={`${isMenuOpen ? "block" : "hidden"
                        //     } md:block transition duration-300 ease-in-out`}
                        >
                            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-lg font-medium">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-red-500 text-xs lg:text-base"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/recipe"
                                        className="hover:text-red-500 text-xs lg:text-base"
                                    >
                                        Explore Recipes
                                    </Link>
                                </li>
                                {user && (
                                    <li>
                                        <Link
                                            to="/share-recipe"// change to post recipe
                                            className="hover:text-red-500 text-xs lg:text-base"
                                        >
                                            Submit a Recipe
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 relative">
                        {" "}
                        {user ? (

                            <button
                                onClick={logout}
                                className="bg-red-500 text-white text-xs lg:text-base px-5 py-2 rounded-full hover:bg-red-400 ml-4"
                            >
                                Log Out
                            </button>

                        ) : (
                            <button className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-400">
                                <Link to="/login">Login</Link>
                            </button>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar