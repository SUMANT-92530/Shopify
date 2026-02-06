

function Home() {
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
            {["Fashion", "Mobile", "Electronics", "Grocery"].map((cat) => (
            <div
                key={cat}
                className="border rounded-lg p-6 hover:shadow cursor-pointer"
            >
                <div className="h-16 bg-gray-200 mb-3 rounded"></div>
                <p className="font-medium">{cat}</p>
            </div>
            ))}
        </section>

        {/* Best Deals */}
        <section className="max-w-7xl mx-auto px-6 mt-14">
            <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block mb-6">
            Best deal for you
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-4">
            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
                <div
                key={item}
                className="min-w-[180px] border rounded-lg p-4 hover:shadow"
                >
                <div className="h-24 bg-gray-200 rounded mb-2"></div>
                <p className="font-medium">Product {item}</p>
                <p className="text-green-600 font-semibold">₹{item * 499}</p>
                </div>
            ))}
            </div>
        </section>

        </div>
    );
    }

export default Home;
