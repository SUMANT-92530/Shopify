import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice"; // apna cartSlice import kar
import { products } from "./products"; // product data

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const dispatch = useDispatch();

  if (!product) return <h2 className="p-6">Product not found</h2>;

  // 👉 Ye function button ke click pe chalega
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Redux store me product add karega
    alert(`${product.name} added to cart ✅`); // feedback ke liye alert
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left side - Image + Buttons */}
      <div className="flex flex-col items-center border rounded-lg p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-80 h-80 object-contain mb-6"
        />

        {/* CTA Buttons under image */}
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart} // 👈 yaha call ho raha hai
            className="bg-orange-500 text-white px-8 py-3 rounded font-bold hover:bg-orange-600"
          >
            ADD TO CART
          </button>
          <button className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700">
            BUY NOW
          </button>
        </div>
      </div>

      {/* Right side - Product Details */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-2xl text-green-600 font-semibold mt-2">
          ₹{product.price}
        </p>

        {/* Ratings */}
        <div className="mt-4 flex items-center gap-2">
          <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
            4.3 ★
          </span>
          <p className="text-gray-600">10,316 Ratings & 1,151 Reviews</p>
        </div>

        {/* Specifications */}
        <h3 className="mt-6 text-lg font-semibold">Specifications:</h3>
        <ul className="list-disc ml-6 text-gray-700">
          {product.specs?.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>

        {/* Offers */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Available Offers</h3>
          <ul className="list-disc ml-6 text-blue-600">
            {product.offers?.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </div>

        {/* Warranty */}
        <p className="mt-6 text-gray-800 font-medium">
          Warranty: {product.warranty}
        </p>
        <p className="text-sm text-gray-500">+ ₹99 Protect Promise Fee</p>

        {/* Delivery Info */}
        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Delivery:</span> Secure delivery by
          Tomorrow
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;