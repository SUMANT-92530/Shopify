import { Routes, Route, Navigate } from "react-router-dom";

// Common layout
import Navbar from "./component/common/navbar";
import Footer from "./component/common/footer";

// Auth
import LoginForm from "./component/core/auth/LoginForm";
import SignupForm from "./component/core/auth/SignupForm";

// Customer
import Dashboard from "./pages/Customer/Dashboard";
import MyProfile from "./pages/Customer/dashboard/MyProfile";
import MyOrders from "./pages/Customer/dashboard/MyOrders";
import AccountSettings from "./pages/Customer/dashboard/AccountSetting";
import Cart from "./pages/Cart/Cart"; // Cart import

// Pages
import Home from "./pages/home";
import ProductDetails from "./Product/ProductDetails";
import CategoryPage from "./pages/CategoryPage";

// Seller
import SellerVerification from "./pages/Seller/SellerVerification";
import NavbarSeller from "./component/common/navbarSeller";
import { useSelector } from "react-redux";

import SellerDashboardLayout from "./pages/Seller/SellerDashboardLayout";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import AddListing from "./pages/Seller/listing/AddListing";
import SellerListingPage from "./pages/Seller/dashboardPages/listings";
import ProductList from "./pages/Customer/ProductList";




function App() {

  const { isAuthenticated, user } = useSelector((state) => state.auth);


  return (
    <>
      {/* Navbar stays visible on all pages */}

      {
        isAuthenticated && user.role === "seller" ? (
          <NavbarSeller />
        ) : (
          <Navbar />
        )
      }

      {/* Page routing */}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> {/* Top-level cart */}
        <Route path="/category/:name" element={<CategoryPage />} />

        {/* Seller route fixed */}
        <Route path="/seller/verification" element={<SellerVerification />} />

      {/* Dashboard Parent Layout */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Default Route */}
        <Route index element={<Navigate to="my-profile" />} />
        
        {/* Child Pages */}
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="account-settings" element={<AccountSettings />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-cart" element={<Cart />} /> {/* Added Cart inside dashboard */}
      </Route>

        <Route path="/seller-verification" element={<SellerVerification />} />

        {/* Seller Dashboard Routes */}
        <Route
          path="/seller"
          element={
            <SellerProtectedRoute>
              <SellerDashboardLayout />
            </SellerProtectedRoute>
          }
        >
          <Route index element={<h2>Welcome Seller</h2>} />
          <Route path="dashboard" element={<h2>Seller Dashboard</h2>} />
          <Route path="listings" element={<SellerListingPage />} />
          <Route path="add-listing" element={<AddListing />} />
          <Route path="orders" element={<h2>Orders Page</h2>} />
          <Route path="payments" element={<h2>Payments Page</h2>} />
          <Route path="growth" element={<h2>Growth Page</h2>} />
          <Route path="ads" element={<h2>Advertising Page</h2>} />
          <Route path="reports" element={<h2>Reports Page</h2>} />
          <Route path="partners" element={<h2>Partner Services Page</h2>} />
        </Route>


      </Routes>

      {/* Footer stays visible on all pages */}
      <Footer />
    </>
  );
}

export default App;