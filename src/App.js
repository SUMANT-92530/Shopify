// App.js
import { Routes, Route } from "react-router-dom";

// Common layout
import Navbar from "./component/navbar";
import Login from "./component/login";
import Signup from "./component/signup";

// Pages
import Home from "./pages/home";
import Profile from "./pages/Customer/profile";

// import Orders from "./pages/Orders";

function App() {
  return (
    <>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      {/* Page routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/orders" element={<Orders />} /> */}
      </Routes>
    </>
  );
}

export default App;
