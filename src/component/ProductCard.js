import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[200px] border rounded-xl p-4 bg-white hover:shadow-lg cursor-pointer transition"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Product Image (Fallback) */}
      <img
        src={
          product.image
            ? product.image
            : "https://via.placeholder.com/200x150?text=No+Image"
        }
        alt={product.productName}
        className="h-28 w-full object-cover rounded-md mb-3"
      />

      {/* Product Name */}
      <p className="font-semibold text-gray-800 truncate">
        {product.productName}
      </p>

      {/* Brand */}
      <p className="text-sm text-gray-500">{product.brand}</p>

      {/* Price */}
      <p className="text-green-600 font-bold mt-2">
        ₹{product.price}
      </p>

      {/* Stock */}
      {product.stock > 0 ? (
        <p className="text-xs text-gray-400 mt-1">
          Stock: {product.stock}
        </p>
      ) : (
        <p className="text-xs text-red-500 mt-1">Out of Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
