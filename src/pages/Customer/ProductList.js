import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../services/operations/productAPI";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data || []);
    };

    loadProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Available Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl p-4 shadow bg-white"
          >
            <h2 className="font-semibold text-lg">
              {item.productName}
            </h2>

            <p className="text-gray-500">{item.brand}</p>

            <p className="text-blue-600 font-bold mt-2">
              ₹{item.price}
            </p>

            <Link
              to={`/product/${item._id}`}
              className="block text-center mt-4 bg-blue-600 text-white py-2 rounded-lg"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
