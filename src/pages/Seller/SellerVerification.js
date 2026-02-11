import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sellerVerified } from "../../slices/authSlice"; // <-- create this action in your slice
import { setUser } from "../../slices/authSlice"; // <-- create this action in your slice
import { useSelector } from "react-redux";


const SellerVerification = () => {
  const [verified, setVerified] = useState({
  mobile: false,
  email: false,
  gstin: false,
  signature: false,

  store: {
    completed: false,
    storeName: "",
  },

  listing: false,
});


  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calculate progress dynamically
  const totalSteps = 6;
  const completedSteps = Object.values(verified).filter(Boolean).length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  // ✅ Handle final verification + navigation
      const handleGoToDashboard = () => {
        dispatch(
          setUser({
            ...user,
            storeName: verified.store.storeName,
          })
        );

        dispatch(
          sellerVerified({
            verified: true,
            steps: verified,
          })
        );

        navigate("/seller/dashboard");
      };


  return (
    <div className="flex pt-16 max-w-6xl mx-auto min-h-screen mt-10 gap-8">
      {/* Left Panel */}
      <div className="w-1/3 border rounded-lg p-6 shadow h-fit">
        <h3 className="text-lg font-bold mb-4">Your verification progress</h3>
        <p className="text-sm mb-4">{progressPercent}% completed</p>

        <div className="space-y-3">
          <p className="font-medium">Mobile & Email Verification</p>
          <div className="ml-4 space-y-2">
            <span className={`block ${verified.mobile ? "text-green-600" : "text-gray-600"}`}>
              {verified.mobile ? "✔ Mobile Verified" : "○ Mobile Verification"}
            </span>
            <span className={`block ${verified.email ? "text-green-600" : "text-gray-600"}`}>
              {verified.email ? "✔ Email Verified" : "○ Email Verification"}
            </span>
          </div>

          <p className="font-medium mt-4">ID & Signature Verification</p>
          <div className="ml-4 space-y-2">
            <span className={`block ${verified.gstin ? "text-green-600" : "text-gray-600"}`}>
              {verified.gstin ? "✔ GSTIN Verified" : "○ GSTIN Verification"}
            </span>
            <span className={`block ${verified.signature ? "text-green-600" : "text-gray-600"}`}>
              {verified.signature ? "✔ Signature Added" : "○ Signature Verification"}
            </span>
          </div>

          <p className="font-medium mt-4">Store & Pickup Details</p>
          <div className="ml-4 space-y-2">
            <span className={`block ${verified.store ? "text-green-600" : "text-gray-600"}`}>
              {verified.store ? "✔ Store Details Added" : "○ Store Details"}
            </span>
          </div>

          <p className="font-medium mt-4">Listing & Stock Availability</p>
          <div className="ml-4 space-y-2">
            <span className={`block ${verified.listing ? "text-green-600" : "text-gray-600"}`}>
              {verified.listing ? "✔ Listing Created" : "○ Listing Pending"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-2/3 border rounded-lg p-6 shadow">
        {/* Example: Mobile & Email Verification */}
        <h3 className="text-xl font-bold mb-4">Mobile & Email Verification</h3>
        <input type="text" placeholder="Mobile Number" className="w-full mb-3 p-2 border rounded" />
        <input type="email" placeholder="Email Address" className="w-full mb-3 p-2 border rounded" />
        <button
          onClick={() => setVerified({ ...verified, mobile: true, email: true })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Verify
        </button>

        {/* Example: GSTIN & Signature */}
        <h3 className="text-xl font-bold mt-8 mb-4">ID & Signature Verification</h3>
        <input type="text" placeholder="Enter GSTIN" className="w-full mb-3 p-2 border rounded" />
        <button
          onClick={() => setVerified({ ...verified, gstin: true })}
          className="bg-green-600 text-white px-4 py-2 rounded mb-3"
        >
          Verify GSTIN
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => setVerified({ ...verified, signature: true })}
            className="px-4 py-2 border rounded"
          >
            Draw Signature
          </button>
          <button
            onClick={() => setVerified({ ...verified, signature: true })}
            className="px-4 py-2 border rounded"
          >
            Upload Signature
          </button>
        </div>

        {/* Example: Store & Pickup */}
        <h3 className="text-xl font-bold mt-8 mb-4">Store & Pickup Details</h3>
        <input
            type="text"
            placeholder="Store Name"
            value={verified.store.storeName}
            onChange={(e) =>
              setVerified({
                ...verified,
                store: {
                  ...verified.store,
                  storeName: e.target.value,
                },
              })
            }
            className="w-full mb-3 p-2 border rounded"
        />

        <input type="text" placeholder="Pickup Address" className="w-full mb-3 p-2 border rounded" />
        <button
          onClick={() =>
            setVerified({
              ...verified,
              store: {
                ...verified.store,
                completed: true,
              },
            })
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Store Details
        </button>


        {/* Example: Listing */}
        <h3 className="text-xl font-bold mt-8 mb-4">Listing & Stock Availability</h3>
        <button
          onClick={() => setVerified({ ...verified, listing: true })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Products
        </button>
        <br />
        <button
          onClick={handleGoToDashboard}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SellerVerification;