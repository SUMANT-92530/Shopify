import { useState } from "react";

function Signup() {

  // form states
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        console.log("Signup Data:", { role, name, email, password });
        alert("Signup successful (frontend only)");
    };

    return (
        <div className="flex justify-center mt-12">
        <form
            onSubmit={handleSignup}
            className="bg-white p-8 shadow rounded w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

            {/* Role Selection */}
            <div className="mb-4">
            <p className="font-medium mb-2">Select Role</p>
            <div className="flex gap-6">
                <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="role"
                    value="customer"
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                Customer
                </label>

                <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="role"
                    value="seller"
                    onChange={(e) => setRole(e.target.value)}
                />
                Seller
                </label>
            </div>
            </div>

            <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />

            <input
            type="email"
            placeholder="Gmail"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            >
            Sign Up
            </button>
        </form>
        </div>
    );
}

export default Signup;
