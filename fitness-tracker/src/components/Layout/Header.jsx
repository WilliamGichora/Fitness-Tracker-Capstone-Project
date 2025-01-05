import { useState } from "react"
import { Link } from "react-router-dom"
import hambuger from '../../assets/burger-menu-svgrepo-com.svg'
import close from '../../assets/close-svgrepo-com.svg'

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="container relative flex items-center justify-between py-5 px-2 font-poppins">
            <div className="lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none"
                >
                    <img
                        src={hambuger}
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
                <Link to="/" className="font-semibold text-lg">Jenga</Link>
            </div>

            <nav
                className={`absolute left-0 top-full w-full bg-gray-300 lg:static lg:bg-transparent lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"
                    }`}
            >
                <div className="flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-4">
                    <Link
                        to="/"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-black hover:text-gray-400"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/workouts"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-black hover:text-gray-400"
                    >
                        Workouts
                    </Link>
                    <Link
                        to="/progress"
                        className="block px-4 py-2 mt-2 lg:mt-0 text-black hover:text-gray-400"
                    >
                        Progress
                    </Link>
                </div>
            </nav>
        </header>

    )
}

export default Header;
