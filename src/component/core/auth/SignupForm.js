import { signup } from "../../../services/operations/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState(ACCOUNT_TYPE.CUSTOMER);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const { name, email, password, storeName } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupData = { ...formData, role };
    if (role === ACCOUNT_TYPE.CUSTOMER) {
      delete signupData.storeName;
    }

    try {
      const response = await dispatch(signup(signupData));

      // ✅ Navigation handled here in component
      if (response.role === "seller") {
        navigate("/seller/verification");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }

    setFormData({ name: "", email: "", password: "", storeName: "" });
    setRole(ACCOUNT_TYPE.CUSTOMER);
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
                checked={role === "customer"}
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
                checked={role === "seller"}
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
          onChange={handleChange}
          name="name"
          required
        />

        <input
          type="email"
          placeholder="Gmail"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={email}
          onChange={handleChange}
          name="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={password}
          onChange={handleChange}
          name="password"
          required
        />

        {/* Store Name only for sellers */}
        {role === "seller" && (
          <input
            type="text"
            placeholder="Store Name"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={storeName}
            onChange={handleChange}
            name="storeName"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;