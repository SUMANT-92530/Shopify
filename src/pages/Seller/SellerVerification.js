import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SellerVerification = () => {
  const [verified, setVerified] = useState({
    mobile: false,
    email: false,
    signature: false,
    store: false,
    listing: false,
  });

  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    storeName: "",
    pickupAddress: "",
  });

  const sigCanvas = useRef(null); // ✅ canvas ref
  const [uploadedFile, setUploadedFile] = useState(null);

  const totalSteps = 5;
  const completedSteps = Object.values(verified).filter(Boolean).length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const isEmpty = (value) => !value || value.trim() === "";

  return (
    <div className="flex max-w-6xl mx-auto min-h-screen mt-10 gap-8">
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

          <p className="font-medium mt-4">Signature Verification</p>
          <div className="ml-4 space-y-2">
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
        {/* Mobile & Email Verification */}
        <h3 className="text-xl font-bold mb-4">Mobile & Email Verification</h3>
        <input
          type="text"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={() => {
            if (!isEmpty(formData.mobile) && !isEmpty(formData.email)) {
              setVerified({ ...verified, mobile: true, email: true });
            } else {
              alert("Please enter Mobile and Email before verifying!");
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Verify
        </button>

        {/* Signature Verification */}
        <h3 className="text-xl font-bold mt-8 mb-4">Signature Verification</h3>

        {/* Draw Signature */}
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: "border mb-3" }}
        />
        <button
          onClick={() => {
            if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
              setVerified({ ...verified, signature: true });
            } else {
              alert("Please draw your signature!");
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded mb-3"
        >
          Save Signature
        </button>

        {/* Upload Signature */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setUploadedFile(e.target.files[0]);
              setVerified({ ...verified, signature: true });
            } else {
              alert("Please upload a signature file!");
            }
          }}
          className="mb-3"
        />

        {/* Store & Pickup */}
        <h3 className="text-xl font-bold mt-8 mb-4">Store & Pickup Details</h3>
        <input
          type="text"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <button
          onClick={() => {
            if (!isEmpty(formData.storeName) && !isEmpty(formData.pickupAddress)) {
              setVerified({ ...verified, store: true });
            } else {
              alert("Please enter Store Name and Pickup Address before saving!");
            }
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        {/* Listing */}
        <h3 className="text-xl font-bold mt-8 mb-4">Listing & Stock Availability</h3>
        <button
          onClick={() => setVerified({ ...verified, listing: true })}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Products
        </button>
      </div>
    </div>
  );
};

export default SellerVerification;