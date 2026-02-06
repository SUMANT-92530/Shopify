import { useSelector } from "react-redux";

function MyProfile() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="max-w-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-10">
            My Profile
        </h1>

        {/* Profile Info */}
        <div className="space-y-6">

            {/* Name (Not Editable) */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Full Name
            </label>
            <input
                value={user?.name || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border bg-gray-100 cursor-not-allowed"
            />
            </div>

            {/* Email (Not Editable) */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Email Address
            </label>
            <input
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border bg-gray-100 cursor-not-allowed"
            />
            </div>

            {/* Address (Editable) */}
            <div>
            <label className="block text-gray-600 font-semibold mb-2">
                Home Address
            </label>
            <input
                defaultValue={user?.address || ""}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-black outline-none"
            />
            </div>
        </div>

        {/* ✅ Delete Account Small + Bottom */}
        <div className="mt-14 flex justify-end">
            <button className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
            Delete Account
            </button>
        </div>
        </div>
    );
}

export default MyProfile;
