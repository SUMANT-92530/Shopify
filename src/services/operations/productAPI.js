import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/api/products";

/* ================================
    ✅ SELLER: Add Product
    ================================ */
    export const addProduct = async (token, formData) => {
    try {
        const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // authMiddleware needs this
        },
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!data.success) {
        throw new Error(data.message);
        }

        toast.success("Product Added Successfully ✅");
        return data.product;
    } catch (error) {
        toast.error("Failed to Add Product ❌");
        console.log("Add Product Error:", error);
    }
    };

    /* ================================
    ✅ CUSTOMER: Get Products
    ================================ */
    export const fetchAllProducts = async () => {
    try {
        const response = await fetch(BASE_URL);

        const data = await response.json();

        if (!data.success) {
        throw new Error(data.message);
        }

        return data.products;
    } catch (error) {
        console.log("Fetch Products Error:", error);
    }
};
