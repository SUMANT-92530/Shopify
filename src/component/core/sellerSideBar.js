import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Wallet,
    TrendingUp,
    Megaphone,
    FileText,
    Users,
    Menu,
    X,
    } from "lucide-react";

    const SellerSidebar = () => {
    const [open, setOpen] = useState(false);

    const menuLinks = [
        { name: "Welcome", path: "/seller/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Listings", path: "/seller/listings", icon: <Package size={18} /> },
        { name: "Orders", path: "/seller/orders", icon: <ShoppingCart size={18} /> },
        { name: "Payments", path: "/seller/payments", icon: <Wallet size={18} /> },
        { name: "Growth", path: "/seller/growth", icon: <TrendingUp size={18} /> },
        { name: "Advertising", path: "/seller/ads", icon: <Megaphone size={18} /> },
        { name: "Reports", path: "/seller/reports", icon: <FileText size={18} /> },
        { name: "Partner Services", path: "/seller/partners", icon: <Users size={18} /> },
    ];

    return (
        <>
        {/* Mobile Toggle Button */}
        <button
            className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md pt-20 mt-20"
            onClick={() => setOpen(!open)}
        >
            {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <div
            className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white border-r shadow-md z-40 transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:h-screen`}
        >
            {/* Logo */}
            <div className="p-5 border-b">
            <h1 className="text-xl font-bold text-blue-600">
                Dashboard Panel
            </h1>
            <p className="text-sm text-gray-500"></p>
            </div>

            {/* Links */}
            <nav className="flex flex-col p-4 gap-2">
            {menuLinks.map((item, index) => (
                <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                    isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                }
                onClick={() => setOpen(false)}
                >
                {item.icon}
                {item.name}
                </NavLink>
            ))}
            </nav>
        </div>
        </>
    );
};

export default SellerSidebar;
