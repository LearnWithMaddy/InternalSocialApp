// src/layout/AuthLayout.jsx
import {Link, Outlet, useLocation} from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {MoreVertical, MoreVerticalIcon} from "lucide-react";

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

export default function AuthLayout() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">Intranet</div>

                {/* Nav Items */}
                <ul className="flex flex-wrap gap-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`text-sm font-medium transition ${
                                    location.pathname === item.path
                                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                                        : "text-gray-700 hover:text-blue-600"
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Profile & Menu */}
                <div className="relative ml-6" ref={dropdownRef}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Profile"
                            className="w-9 h-9 rounded-full border"
                        />
                        <MoreVerticalIcon className="w-5 h-5 text-gray-600 hover:text-blue-600"/>
                    </div>

                    {/* Dropdown */}
                    {menuOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 border">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/create-post"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                New Post
                            </Link>
                            <Link
                                to="/your-posts"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Your Posts
                            </Link>
                            <button
                                onClick={() => {
                                    // TODO: Implement logout
                                    console.log("Logout");
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-white-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow w-full px-6 py-6">
                <div className="w-full max-w-full">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
