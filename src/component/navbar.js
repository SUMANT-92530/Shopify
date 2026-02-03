import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex justify-between px-6 py-4 border-b">

        <Link to="/" className="text-2xl font-bold text-blue-600">
            Shopify
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

            <div>🛒 Cart</div>

            {/* IF LOGGED IN */}
            {user ? (
            <div className="relative">
                <button onClick={() => setOpen(!open)}>
                {user.name} ▾
                </button>

                {open && (
                <div className="absolute right-0 bg-white border rounded shadow">

                    <Link to="/profile" className="block px-4 py-2">
                    My Profile
                    </Link>

                    <Link to="/orders" className="block px-4 py-2">
                    My Orders
                    </Link>

                    <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600"
                    >
                    Logout
                    </button>

                </div>
                )}
            </div>
            ) : (
            // IF LOGGED OUT
            <div className="flex gap-2">
                <Link to="/signup" className="border px-4 py-1 rounded">
                Sign Up
                </Link>
                <Link to="/login" className="bg-blue-600 text-white px-4 py-1 rounded">
                Login
                </Link>
            </div>
            )}

        </div>
        </nav>
    );
}

export default Navbar;
