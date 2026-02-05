// App.js
import { Routes, Route } from "react-router-dom";

// Common layout
import Navbar from "./component/common/navbar";

// Auth
import LoginForm from "./component/core/auth/LoginForm";
import SignupForm from "./component/core/auth/SignupForm";

// Pages
import Home from "./pages/home";

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

      </Routes>
    </>
  );
}

export default App;
