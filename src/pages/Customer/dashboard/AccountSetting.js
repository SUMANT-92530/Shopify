import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../slices/authSlice";

function AccountSettings() {
    const dispatch = useDispatch();

    // Current user from Redux
    const { user } = useSelector((state) => state.auth);

    // Local Form State
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    // Handle Change
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // Save Handler
    const handleSave = (e) => {
        e.preventDefault();

        // ✅ Update Redux + LocalStorage
        dispatch(setUser({ ...user, ...formData }));

        alert("Account details updated successfully!");
    };

    return (
        <div className="max-w-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-10">
            Account Settings
        </h1>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">

            {/* Name */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Full Name
            </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black outline-none"
            />
            </div>

            {/* Phone */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Phone Number
            </label>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black outline-none"
            />
            </div>

            {/* Address */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Home Address
            </label>
            <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black outline-none"
            />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
            <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-800 transition"
            >
                Save Changes
            </button>
            </div>
        </form>
        </div>
    );
}

export default AccountSettings;
