import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../../slices/listingSlice";

const tabs = [
    "Active",
    "Ready for Activation",
    "Blocked",
    "Inactive",
    "Archived",
    ];

    export default function ListingTabs() {
    const dispatch = useDispatch();
    const { activeTab } = useSelector((state) => state.listings);

    return (
        <div className="flex gap-6 border-b mt-6 overflow-x-auto">
        {tabs.map((tab) => (
            <button
            key={tab}
            onClick={() => dispatch(setTab(tab))}
            className={`pb-3 whitespace-nowrap font-medium ${
                activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
            >
            {tab}
            </button>
        ))}
        </div>
    );
}
