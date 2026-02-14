import { useSelector } from "react-redux";

export default function ListingTable() {
    const { listings } = useSelector((state) => state.listings);

    return (
        <div className="mt-6">
        {/* Table Header */}
        <div className="grid grid-cols-6 font-semibold text-gray-600 text-sm border-b pb-3">
            <p>Product Details</p>
            <p>Price & Settlement</p>
            <p>Stock</p>
            <p>Returns</p>
            <p>Listing Quality</p>
            <p>Actions</p>
        </div>

        {/* Empty State */}
        {listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="text-5xl">📦</div>
            <p className="mt-3 font-medium">No listings found</p>
            </div>
        ) : (
            listings.map((item) => (
            <div key={item.id} className="grid grid-cols-6 py-4 border-b">
                <p>{item.title}</p>
                <p>₹{item.price}</p>
                <p>{item.stock}</p>
                <p>{item.returns}</p>
                <p>{item.quality}</p>
                <button className="text-blue-600">Edit</button>
            </div>
            ))
        )}
        </div>
    );
}
