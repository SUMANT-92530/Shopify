const categories = ["Fashion", "Mobile", "Electronics", "Grocery"];

const Categories = ({ onSelectCategory }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className="bg-gray-200 hover:bg-green-400 text-black font-semibold py-4 rounded-lg shadow-md"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
