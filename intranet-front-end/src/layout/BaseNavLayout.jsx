import {Link, Outlet, useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {MoreVertical, LogOut, User, PlusCircle, FileText} from "lucide-react";

const navItems = [
    {name: "Home", path: "/home"},
    {name: "News", path: "/news"},
    {name: "Agenda", path: "/agenda"},
    {name: "Events", path: "/events"},
    {name: "People", path: "/people"},
    {name: "HR", path: "/hr"},
    {name: "Docs", path: "/docs"},
    {name: "Need Help", path: "/need-help"},
];

export default function BaseNavLayout() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100"> {/* Lighter background */}
            {/* Top Navbar */}
            <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center border-b border-gray-200"> {/* Subtle shadow */}
                <div className="text-2xl font-bold text-indigo-700">Intranet</div>
                {/* Darker Indigo for prominence */}

                {/* Navigation Links */}
                <ul className="hidden md:flex gap-7"> {/* Slightly more spacing */}
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`text-sm font-semibold transition-all duration-200 ${ /* Stronger font, smoother transition */
                                    location.pathname === item.path
                                        ? "text-indigo-700 border-b-2 border-indigo-700 pb-1" /* Active link: darker indigo, thicker border */
                                        : "text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 pb-1" /* Default: muted, hover: vibrant indigo, light border */
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors duration-200" /* Hover effect on avatar area */
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Avatar"
                            className="w-9 h-9 rounded-full border-2 border-indigo-300 object-cover" /* Subtle border around avatar */
                        />
                        <MoreVertical className="w-5 h-5 text-gray-500 hover:text-indigo-600 transition-colors duration-200"/> {/* Muted icon, vibrant hover */}
                    </div>

                    {menuOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden"> {/* Consistent shadow, rounded corners */}
                            <div className="py-2">
                                <DropdownItem to="/profile" icon={<User size={16}/>} label="Profile"/>
                                <DropdownItem to="/create-post" icon={<PlusCircle size={16}/>} label="New Post"/>
                                <DropdownItem to="/your-posts" icon={<FileText size={16}/>} label="Your Posts"/>
                            </div>
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                >
                                    <LogOut size={16} className="mr-2"/>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow px-8 py-8"> {/* Increased padding */}
                <div className="max-w-full mx-auto"> {/* Centered content, if needed */}
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}

function DropdownItem({to, icon, label}) {
    return (
        <Link
            to={to}
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200" /* Hover changes background to light indigo, text to darker indigo */
        >
            <span className="mr-3 text-gray-500">{icon}</span> {/* Muted icon, increased margin */}
            {label}
        </Link>
    );
}