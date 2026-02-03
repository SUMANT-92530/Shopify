import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Profile() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    // main user data
    const [user, setUser] = useState({
        firstName: "Sumant",
        lastName: "Kumar",
        email: "sumant@gmail.com",
        mobile: "9876543210",
        address: "India",
    });

    // temp data for edit mode (used for cancel)
    const [tempUser, setTempUser] = useState(user);

    // which field is currently editable
    const [editField, setEditField] = useState(null);

    // popup state
    const [showPopup, setShowPopup] = useState(false);

    // start editing
    const handleEdit = (field) => {
        setTempUser(user);
        setEditField(field);
    };

    // cancel editing
    const handleCancel = () => {
        setTempUser(user);
        setEditField(null);
    };

    // save changes
    const handleSave = () => {
        setUser(tempUser);
        setEditField(null);

        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    // logout handler
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // delete account handler
    const handleDeleteAccount = () => {
        logout();          // clear auth state
        navigate("/");     // go to home
    };

    return (
        <div className="max-w-7xl mx-auto flex gap-6 mt-10 px-6">

        {/* LEFT SIDEBAR */}
        <div className="w-1/4 border rounded p-4">
            <p className="font-semibold">Hello,</p>
            <p className="text-lg font-bold mb-6">{user.firstName}</p>

            <ul className="space-y-3 text-gray-700">
            <li className="font-semibold">My Orders</li>
            <li className="font-semibold">Account Settings</li>
            <li className="ml-4 text-blue-600">Profile Information</li>
            <li className="ml-4">Change Password</li>

            {/* Logout from sidebar */}
            <li
                onClick={handleLogout}
                className="text-red-600 mt-6 cursor-pointer"
            >
                Logout
            </li>
            </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-3/4 border rounded p-6 relative">
            <h2 className="text-xl font-bold mb-6">
            Personal Information
            </h2>

            {/* NAME */}
            <div className="mb-4">
            <p className="font-medium mb-1">Your Name</p>
            <div className="flex gap-4 items-center">
                <input
                disabled={editField !== "name"}
                value={tempUser.firstName}
                onChange={(e) =>
                    setTempUser({ ...tempUser, firstName: e.target.value })
                }
                className="border px-3 py-2 rounded"
                />
                <input
                disabled={editField !== "name"}
                value={tempUser.lastName}
                onChange={(e) =>
                    setTempUser({ ...tempUser, lastName: e.target.value })
                }
                className="border px-3 py-2 rounded"
                />

                {editField === "name" ? (
                <>
                    <button onClick={handleCancel} className="text-gray-600">
                    Cancel
                    </button>
                    <button onClick={handleSave} className="text-blue-600 font-medium">
                    Save
                    </button>
                </>
                ) : (
                <button
                    onClick={() => handleEdit("name")}
                    className="text-blue-600"
                >
                    Edit
                </button>
                )}
            </div>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
            <p className="font-medium mb-1">Email Address</p>
            <div className="flex gap-4 items-center">
                <input
                disabled={editField !== "email"}
                value={tempUser.email}
                onChange={(e) =>
                    setTempUser({ ...tempUser, email: e.target.value })
                }
                className="border px-3 py-2 rounded w-1/2"
                />

                {editField === "email" ? (
                <>
                    <button onClick={handleCancel} className="text-gray-600">
                    Cancel
                    </button>
                    <button onClick={handleSave} className="text-blue-600 font-medium">
                    Save
                    </button>
                </>
                ) : (
                <button
                    onClick={() => handleEdit("email")}
                    className="text-blue-600"
                >
                    Edit
                </button>
                )}
            </div>
            </div>

            {/* MOBILE */}
            <div className="mb-4">
            <p className="font-medium mb-1">Mobile Number</p>
            <div className="flex gap-4 items-center">
                <input
                disabled={editField !== "mobile"}
                value={tempUser.mobile}
                onChange={(e) =>
                    setTempUser({ ...tempUser, mobile: e.target.value })
                }
                className="border px-3 py-2 rounded w-1/2"
                />

                {editField === "mobile" ? (
                <>
                    <button onClick={handleCancel} className="text-gray-600">
                    Cancel
                    </button>
                    <button onClick={handleSave} className="text-blue-600 font-medium">
                    Save
                    </button>
                </>
                ) : (
                <button
                    onClick={() => handleEdit("mobile")}
                    className="text-blue-600"
                >
                    Edit
                </button>
                )}
            </div>
            </div>

            {/* ADDRESS */}
            <div className="mb-6">
            <p className="font-medium mb-1">Address</p>
            <div className="flex gap-4 items-center">
                <input
                disabled={editField !== "address"}
                value={tempUser.address}
                onChange={(e) =>
                    setTempUser({ ...tempUser, address: e.target.value })
                }
                className="border px-3 py-2 rounded w-2/3"
                />

                {editField === "address" ? (
                <>
                    <button onClick={handleCancel} className="text-gray-600">
                    Cancel
                    </button>
                    <button onClick={handleSave} className="text-blue-600 font-medium">
                    Save
                    </button>
                </>
                ) : (
                <button
                    onClick={() => handleEdit("address")}
                    className="text-blue-600"
                >
                    Edit
                </button>
                )}
            </div>
            </div>

            {/* DELETE ACCOUNT */}
            <button
            onClick={handleDeleteAccount}
            className="text-red-600 font-medium border border-red-600 px-4 py-2 rounded hover:bg-red-50"
            >
            Delete Account
            </button>

            {/* SAVED POPUP */}
            {showPopup && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
                Profile saved successfully
            </div>
            )}
        </div>
        </div>
    );
}

export default Profile;
