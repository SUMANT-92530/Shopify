import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

function DashboardLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    // Logout Handler
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-50">

        {/* ✅ Sidebar */}
        <aside className="w-[300px] bg-white shadow-xl border-r flex flex-col">

            {/* ✅ Profile Header */}
            <div className="p-8 border-b flex flex-col items-center text-center">

            {/* Profile Pic */}
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                {user?.name?.charAt(0) || "U"}
            </div>

            {/* Hello Text */}
            <h2 className="mt-4 text-lg font-semibold text-gray-700">
                Hello,
                <span className="text-black font-bold">
                {" "}
                {user?.name || "User"}
                </span>
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Welcome to your dashboard
            </p>
            </div>

            {/* ✅ Menu */}
            <nav className="flex-1 px-6 py-6 space-y-4">

            <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                `block px-5 py-3 rounded-xl font-semibold transition ${
                    isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
            >
                👤 My Profile
            </NavLink>

            <NavLink
                to="/dashboard/account-settings"
                className={({ isActive }) =>
                `block px-5 py-3 rounded-xl font-semibold transition ${
                    isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
            >
                ⚙️ Account Settings
            </NavLink>

            <NavLink
                to="/dashboard/my-orders"
                className={({ isActive }) =>
                `block px-5 py-3 rounded-xl font-semibold transition ${
                    isActive
                    ? "bg-black text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
            >
                📦 My Orders
            </NavLink>
            </nav>

            {/* ✅ Logout */}
            <div className="p-6 border-t">
            <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
            >
                Logout →
            </button>
            </div>
        </aside>

        {/* ✅ Right Content Area */}
        <main className="flex-1 px-16 py-12">

            {/* Content Container with More Space */}
            <div className="bg-white rounded-3xl shadow-lg p-12 min-h-[85vh]">
            <Outlet />
            </div>
        </main>
        </div>
    );
}

export default DashboardLayout;
