// App.js
import { Routes, Route, Navigate } from "react-router-dom";

// Common layout
import Navbar from "./component/common/navbar";
import Footer from "./component/common/footer";

// Auth
import LoginForm from "./component/core/auth/LoginForm";
import SignupForm from "./component/core/auth/SignupForm";


// Customer
import Dashboard from "./pages/Customer/Dashboard";
// import SearchResults from "./pages/Customer/SearchResults";

// Dashboard
import MyProfile from "./pages/Customer/dashboard/MyProfile";
import MyOrders from "./pages/Customer/dashboard/MyOrders";
import AccountSettings from "./pages/Customer/dashboard/AccountSetting";

// Pages
import Home from "./pages/home";
import ProductDetails from "./Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import CategoryPage from "./pages/CategoryPage";



function App() {
  return (
    <>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      {/* Page routing */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:name" element={<CategoryPage />} />



        {/* <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/account-settings" element={<AccountSettings />} />
        <Route path="/dashboard/my-orders" element={<MyOrders />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} /> */}
        
        {/* ✅ Dashboard Parent Layout */}
      <Route path="/dashboard" element={<Dashboard />}>

        {/* Default Route */}
        <Route index element={<Navigate to="my-profile" />} />

        {/* Child Pages */}
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="account-settings" element={<AccountSettings />} />
        <Route path="my-orders" element={<MyOrders />} />
        

      </Route>

      </Routes>

      {/* Footer stays visible on all pages */}
      <Footer />
    </>
  );
}

export default App;


