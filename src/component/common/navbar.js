// src/components/Navbar.js

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { ShoppingCart, Search } from "lucide-react";

const Navbar = ({ products = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // ✅ Cart count from Redux
  const cartCount = useSelector((state) => state.cart.items.length);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
  // Whenever auth state changes, force dropdown closed
    setDropdownOpen(false);
    },  [isAuthenticated]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    navigate(`/search?query=${e.target.value}`);
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* ✅ Logo */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-green-400"
      >
        Shopify
      </Link>

      {/* ✅ Search Bar */}
      <div className="w-[45%] relative hidden md:flex">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 rounded-lg text-black outline-none"
        />
      </div>

      {/* ✅ Right Side */}
      <div className="flex items-center gap-5">
        {/* ✅ Cart Icon (only if logged in) */}
        {isAuthenticated && (
          <Link to="/dashboard/my-cart" className="relative hover:text-green-400">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* ✅ If Not Logged In */}
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          /* ✅ User Dropdown */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              {user?.name || "User"} ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                <Link
                  to="/dashboard/my-profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>

                <Link
                  to="/dashboard/my-orders"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Orders
                </Link>

                <Link
                  to="/dashboard/my-cart"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Cart 🛒
                  {cartCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;