import {login} from "../../../services/operations/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(formData, navigate));
    }

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
            onChange={handleChange}
            name="email"
            required
            />

            {/* Password */}
            <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={handleChange}
            name="password"
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

export default LoginForm;