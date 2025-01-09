import { useState } from "react";
import { Link } from "react-router-dom";
import hamburger from "../../assets/burger-menu-svgrepo-com.svg";
import close from "../../assets/close-svgrepo-com.svg";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="relative flex items-center justify-between py-5 px-4 font-poppins bg-lime-600 text-gray-800 shadow-lg">
            <div className="lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none z-10">
                    <img
                        src={hamburger}
                        alt="Menu"
                        className={`h-5 w-5 ${isOpen ? "hidden" : "block"}`}
                    />
                    <img
                        src={close}
                        alt="Close"
                        className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                    />
                </button>
            </div>

            <div>
                <Link to="/" className="font-bold text-2xl text-white hover:underline">
                    Jenga
                </Link>
            </div>

            <nav
                className={`absolute left-0 top-full w-full bg-gray-100 z-50 lg:static lg:bg-transparent lg:flex lg:items-center lg:w-auto transition-transform ${isOpen ? "block" : "hidden"
                    }`}
            >
                <div className="flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-6">
                    <Link
                        to="/"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-gray-800 hover:text-lime-700"
                        onClick={()=>setIsOpen(!isOpen)}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/workouts"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-gray-800 hover:text-lime-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Workouts
                    </Link>
                    <Link
                        to="/progress"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-gray-800 hover:text-lime-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Progress
                    </Link>
                    <Link
                        to="/exercises"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-gray-800 hover:text-lime-700 lg:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Exercises
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
