import React from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "../../component/core/sellerSideBar";
import SellerListingPage from "./dashboardPages/listings";

const SellerDashboardLayout = () => {
    return (
        <div className="flex pt-20">
        {/* Sidebar */}
        <SellerSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-6 p-6 bg-gray-50 min-h-screen">
            <Outlet />
        </div>
        </div>
    );
};

export default SellerDashboardLayout;
