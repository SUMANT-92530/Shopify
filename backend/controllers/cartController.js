import Cart from "../models/customer/Cart.js";
import CustomerProfile from "../models/customer/Profile.js";

//ADD TO CART 
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const customer = await CustomerProfile.findOne({
      userId: req.user.userId
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let cart = await Cart.findOne({ customerId: customer._id });

    if (!cart) {
      cart = await Cart.create({
        customerId: customer._id,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
