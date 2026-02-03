import Order from "../models/customer/Order.js";
import Cart from "../models/customer/Cart.js";
import OrderSold from "../models/seller/OrderSold.js";
import CustomerProfile from "../models/customer/CustomerProfile.js";

//PLACE ORDER 
export const placeOrder = async (req, res) => {
  try {
    const customer = await CustomerProfile.findOne({
      userId: req.user.userId
    });

    const cart = await Cart.findOne({ customerId: customer._id }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    
    const orderItems = cart.items.map((item) => {
      totalAmount += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    const order = await Order.create({
      customerId: customer._id,
      items: orderItems,
      totalAmount
    });

    // Create seller order history
    for (const item of orderItems) {
      await OrderSold.create({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity
      });
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
