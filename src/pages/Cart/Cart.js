import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart, decreaseQuantity } from "../../slices/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items); // ✅ correct path
  const dispatch = useDispatch();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2 bg-yellow-500 text-white rounded">-</button>
                  <button onClick={() => dispatch(addToCart(item))} className="px-2 bg-green-600 text-white rounded">+</button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="px-2 bg-red-600 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Price Details</h3>
            <p className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE</span>
            </p>
            <hr className="my-3" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;