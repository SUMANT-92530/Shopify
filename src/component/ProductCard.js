import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[180px] border rounded-lg p-4 hover:shadow cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-24 w-full object-cover mb-2"
      />
      <p className="font-medium">{product.name}</p>
      <p className="text-green-600 font-semibold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;