import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-10">
        {/* Top Section */}
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div>
            <h2 className="text-2xl font-bold text-green-400">
                Shopify
            </h2>
            <p className="text-gray-400 mt-3 text-sm">
                Your one-stop shop for all products.  
                Fast delivery, best prices, and secure payments.
            </p>
            </div>

            {/* Quick Links */}
            <div>
            <h3 className="text-lg font-semibold mb-3">
                Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
                <li>
                <Link to="/" className="hover:text-white">
                    Home
                </Link>
                </li>
                <li>
                <Link to="/shop" className="hover:text-white">
                    Shop
                </Link>
                </li>
                <li>
                <Link to="/dashboard/my-orders" className="hover:text-white">
                    My Orders
                </Link>
                </li>
                <li>
                <Link to="/dashboard/my-cart" className="hover:text-white">
                    Cart
                </Link>
                </li>
            </ul>
            </div>

            {/* Customer Support */}
            <div>
            <h3 className="text-lg font-semibold mb-3">
                Customer Support
            </h3>
            <ul className="space-y-2 text-gray-400">
                <li>
                <Link to="/contact" className="hover:text-white">
                    Contact Us
                </Link>
                </li>
                <li>
                <Link to="/faq" className="hover:text-white">
                    FAQ
                </Link>
                </li>
                <li>
                <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                </Link>
                </li>
                <li>
                <Link to="/terms" className="hover:text-white">
                    Terms & Conditions
                </Link>
                </li>
            </ul>
            </div>

            {/* Newsletter */}
            <div>
            <h3 className="text-lg font-semibold mb-3">
                Subscribe
            </h3>
            <p className="text-gray-400 text-sm mb-3">
                Get updates about new products and offers.
            </p>

            <form className="flex">
                <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-lg text-black outline-none"
                />
                <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-700 transition"
                >
                Send
                </button>
            </form>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Shopify. All Rights Reserved.
        </div>
        </footer>
    );
};

export default Footer;
