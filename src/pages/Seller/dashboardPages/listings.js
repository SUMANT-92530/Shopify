import ListingTabs from "../../../component/core/listings/ListingTabs";
import ListingFilters from "../../../component/core/listings/ListingFilters";
import ListingTable from "../../../component/core/listings/ListingTable";

export default function SellerListingPage() {
    return (
        <div className="bg-white rounded-xl shadow-md p-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold">All Listings</h1>

            {/* Search + Add Listing */}
            <div className="flex gap-3">
            <input
                type="text"
                placeholder="Search by Title, FSN or SKU ID"
                className="border px-4 py-2 rounded-lg w-full md:w-80"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={() => window.location.href = "/seller/add-listing"}>
                Add Listing
            </button>
            </div>
        </div>

        {/* Tabs */}
        <ListingTabs />

        {/* Filters */}
        <ListingFilters />

        {/* Table */}
        <ListingTable />
        </div>
    );
}
