import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

const NavbarSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ✅ Redux State
    const { user, verified } = useSelector((state) => state.auth);

    // ✅ Logout Function (Redux + Redirect)
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            
            {/* ===================================================== */}
            {/* ✅ BEFORE VERIFICATION NAVBAR */}
            {/* ===================================================== */}
            {!verified && (
            <>
                {/* Left Side */}
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white font-bold flex items-center justify-center rounded">
                    S
                </div>

                <h1 className="text-lg font-semibold text-gray-800">
                    Seller Verification
                </h1>
                </div>

                {/* Center Steps */}
                <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
                
                {/* Step 1 */}
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white text-xs">
                    ✓
                    </span>
                    <p className="uppercase tracking-wide">
                    Email & Password
                    </p>
                </div>

                {/* Divider */}
                <div className="w-10 h-[2px] bg-gray-300"></div>

                {/* Step 2 */}
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-400 text-xs">
                    2
                    </span>
                    <p className="uppercase tracking-wide">
                    Business Details
                    </p>
                </div>
                </div>

                {/* Logout Button */}
                <button
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-600 hover:text-red-600 transition"
                >
                LOGOUT
                </button>
            </>
            )}

            {/* ===================================================== */}
            {/* ✅ AFTER VERIFICATION NAVBAR */}
            {/* ===================================================== */}
            {verified && (
            <>
                {/* ✅ LEFT SIDE: Shopify + Seller Hub */}
                <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                    Shopify
                </span>

                <span className="text-base font-medium text-gray-600">
                    Seller Hub
                </span>
                </div>

                {/* ✅ RIGHT SIDE: Bell + Store Name + Logout */}
                <div className="flex items-center gap-6">
                
                {/* Notification Button */}
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                    <Bell size={22} className="text-gray-700" />

                    {/* Notification Dot */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Store Name */}
                <h1 className="text-lg font-semibold text-gray-800">
                    {user?.storeName || "My Store"}
                </h1>

                {/* ✅ Logout Button (Rightest) */}
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
                </div>
            </>
            )}
        </div>
        </header>
    );
};

export default NavbarSeller;
