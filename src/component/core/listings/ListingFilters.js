export default function ListingFilters() {
    return (
        <div className="flex flex-wrap gap-3 mt-5">
        {["Category", "Brand", "Bank Settlement", "More Filters"].map((filter) => (
            <button
            key={filter}
            className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
            >
            {filter} ⬇
            </button>
        ))}

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm">
            Apply
        </button>
        </div>
    );
}
