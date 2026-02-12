import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);

    if (!user || user.role !== "seller") {
        return <Navigate to="/" />;
    }

    return children;
};

export default SellerProtectedRoute;
