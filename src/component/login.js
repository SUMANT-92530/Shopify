import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // mock user (replace with backend later)
        const userData = {
        name: "Sumant Kumar",
        email: email,
        role: "customer",
        };

        login(userData);     // save user in context + localStorage
        navigate("/");       // go to home page
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
        <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded shadow w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">
            Login
            </h2>

            {/* Email */}
            <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            {/* Password */}
            <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            {/* Login Button */}
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Login
            </button>
        </form>
        </div>
    );
}

export default Login;
