import { login, sendOtp } from "../../../services/operations/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // OTP sent or not
    const [otpSent, setOtpSent] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    });

    const { email, otp } = formData;

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // ✅ Send OTP Handler
    const handleSendOtp = () => {
        if (!email) {
        alert("Please enter email first");
        return;
        }

        dispatch(sendOtp(email));
        setOtpSent(true);
    };

    // ✅ Login Handler (OTP Verify)
    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(login(formData, navigate));
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh]">
        <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded shadow w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">
            Login with OTP
            </h2>

            {/* Email Input */}
            <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-2 px-4 py-2 border rounded"
            value={email}
            onChange={handleChange}
            name="email"
            required
            />

            {/* ✅ Send OTP Button */}
            <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
            >
            Send OTP
            </button>

            {/* OTP Input only after OTP Sent */}
            {otpSent && (
            <input
                type="text"
                placeholder="Enter OTP"
                className="w-full mb-4 px-4 py-2 border rounded"
                value={otp}
                onChange={handleChange}
                name="otp"
                required
            />
            )}

            {/* Login Button */}
            <button
            type="submit"
            disabled={!otpSent}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
            Verify OTP & Login
            </button>
        </form>
        </div>
    );
}

export default LoginForm;





// import {login} from "../../../services/operations/authAPI";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function LoginForm() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     })

//     const {email, password} = formData;

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handleLogin = (e) => {
//         e.preventDefault();
//         dispatch(login(formData, navigate));
//     }

//     return (
//         <div className="flex justify-center items-center min-h-[70vh]">
//         <form
//             onSubmit={handleLogin}
//             className="bg-white p-8 rounded shadow w-full max-w-md"
//         >
//             <h2 className="text-2xl font-bold mb-6 text-center">
//             Login
//             </h2>

//             {/* Email */}
//             <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full mb-4 px-4 py-2 border rounded"
//             value={email}
//             onChange={handleChange}
//             name="email"
//             required
//             />

//             {/* Password */}
//             <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full mb-4 px-4 py-2 border rounded"
//             value={password}
//             onChange={handleChange}
//             name="password"
//             required
//             />

//             {/* Login Button */}
//             <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//             Login
//             </button>
//         </form>
//         </div>
//     );

// }

// export default LoginForm;