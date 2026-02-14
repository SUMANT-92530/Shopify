import React, { useState } from "react";
import { addProduct } from "../../../services/operations/productAPI";
import { useSelector } from "react-redux";

const AddListing = () => {
  // Step Control
    const [step, setStep] = useState(1);

    // Complete Listing Form Data
    const [formData, setFormData] = useState({
        // Step 1 Basic
        category: "",
        productName: "",
        brand: "",
        model: "",
        description: "",

        // Step 2 Variations
        color: "",
        size: "",
        sku: "",

        // Step 3 Pricing & Stock
        price: "",
        discount: "",
        stock: "",

        // Step 4 Shipping
        weight: "",
        shippingCharge: "",
    });

    // Input Handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { token } = useSelector((state) => state.auth);

    const handleFinalSubmit = async () => {
        const product = await addProduct(token, formData);

        if (product) {
            console.log("Saved Product:", product);
        }
    };


    return (
        <div className="w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Listing
        </h1>
        <p className="text-gray-500 mb-6">
            Complete all steps to publish your product listing
        </p>

        {/* Step Progress */}
        <div className="flex items-center gap-3 bg-white border rounded-lg p-4 mb-6">
            {["Basic Details", "Variations", "Pricing & Stock", "Shipping & Preview"].map(
            (label, index) => (
                <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer
                ${
                    step === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setStep(index + 1)}
                >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold">
                    {index + 1}
                </span>
                {label}
                </div>
            )
            )}
        </div>

        {/* Main Layout */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
            {/* ---------------- STEP 1 ---------------- */}
            {step === 1 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Basic Details</h2>

                {/* Category */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Select Category
                </label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2"
                >
                    <option value="">Choose Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="grocery">Grocery</option>
                </select>
                </div>

                {/* Product Name */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Product Name
                </label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Brand */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Description */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    className="w-full border rounded-lg px-4 py-2 h-24"
                />
                </div>
            </>
            )}

            {/* ---------------- STEP 2 ---------------- */}
            {step === 2 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Variations</h2>

                {/* Color */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Color Variant
                </label>
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Eg: Black, Blue"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Size */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Size Variant
                </label>
                <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Eg: S, M, L, XL"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* SKU */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    SKU Code
                </label>
                <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Enter unique SKU"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>
            </>
            )}

            {/* ---------------- STEP 3 ---------------- */}
            {step === 3 && (
            <>
                <h2 className="text-xl font-semibold mb-4">Pricing & Stock</h2>

                {/* Price */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Product Price (₹)
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Discount */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Discount (%)
                </label>
                <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="Enter discount"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Stock */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Available Stock
                </label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>
            </>
            )}

            {/* ---------------- STEP 4 ---------------- */}
            {step === 4 && (
            <>
                <h2 className="text-xl font-semibold mb-4">
                Shipping & Preview
                </h2>

                {/* Weight */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Product Weight (kg)
                </label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Shipping Charge */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Shipping Charge (₹)
                </label>
                <input
                    type="number"
                    name="shippingCharge"
                    value={formData.shippingCharge}
                    onChange={handleChange}
                    placeholder="Enter shipping charge"
                    className="w-full border rounded-lg px-4 py-2"
                />
                </div>

                {/* Preview */}
                <div className="bg-gray-50 border rounded-lg p-4 mt-6">
                <h3 className="font-semibold mb-2">Preview Listing</h3>
                <p>
                    <b>Name:</b> {formData.productName}
                </p>
                <p>
                    <b>Category:</b> {formData.category}
                </p>
                <p>
                    <b>Price:</b> ₹{formData.price}
                </p>
                <p>
                    <b>Stock:</b> {formData.stock}
                </p>
                </div>
            </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
            {/* Back */}
            <button
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`px-6 py-2 rounded-lg border
                ${
                step === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
            >
                ← Back
            </button>

            {/* Next / Submit */}
            {step < 4 ? (
                <button
                onClick={() => setStep(step + 1)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                Next →
                </button>
            ) : (
                <button
                onClick={handleFinalSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                Submit Listing ✅
                </button>
            )}
            </div>
        </div>
        </div>
    );
};

export default AddListing;
