import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { fetchAllProducts } from "../services/operations/productAPI";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Backend Products State
  const [products, setProducts] = useState([]);

  // Category images
  const categoryImages = {
    Fashion: "/images/Category/fashion.jpeg",
    Mobile: "/images/Category/mobile.jpeg",
    Electronics: "/images/Category/electronics.jpeg",
    Grocery: "/images/Category/groceries.jpeg",
  };

  /* ================================
    ✅ Fetch Products from Backend
  ================================ */
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAllProducts();

      if (data) {
        setProducts(data);
      }
    };

    loadProducts();
  }, []);

  /* ================================
    ✅ Filter Products by Category
  ================================ */
  const filteredProducts = selectedCategory
    ? products.filter((item) => item.category === selectedCategory)
    : products;

  return (
    <div>
      {/* Quote Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-4xl font-bold text-gray-800">
          Discover products you’ll love,
          <span className="text-blue-600"> delivered at your doorstep</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Shop smarter. Live better. Every day.
        </p>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {Object.entries(categoryImages).map(([cat, img]) => (
          <div
            key={cat}
            className={`border rounded-lg p-6 hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
              selectedCategory === cat ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {/* Category Image */}
            <img
              src={img}
              alt={cat}
              className="h-40 w-40 mx-auto mb-4 object-cover rounded-xl shadow-md"
            />
            <p className="font-semibold text-lg">{cat}</p>
          </div>
        ))}
      </section>

      {/* Clear Filter */}
      {selectedCategory && (
        <div className="text-center mt-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 mt-14">
        <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block mb-6">
          Best deal for you
        </h3>

        {/* Loading Case */}
        {products.length === 0 ? (
          <p className="text-gray-500 mt-6">
            No products available yet...
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
