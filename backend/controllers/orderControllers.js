const { default: ProductModel } = require("../models/productModel");
const orderModel = require("../models/orderModel");

exports.createOrders = async (req, res, next) => {
  try {
    console.log(req.body)
    const { cartItems, shippingInfo, totalAmount, paymentSessionId } = req.body; // Destructure properties from req.body

    // Calculate the amount directly from the provided data, if required
    const amount = Number(
      cartItems.reduce((acc, item) => acc + parseFloat(item.product.price) * item.qty, 0)
    ).toFixed(2);

    // Set the order status as "pending" initially
    const status = "pending";

    // Create the order with the extracted details
    const order = await orderModel.create({
      cartItems,
      amount,
      shippingInfo,
      totalAmount,
      paymentSessionId,
      status,
    });

    // Update product stock in the database
    // cartItems.forEach(async (item) => {
    //   const product = await ProductModel.findById(item.product._id);
    //   if (product) {
    //     product.stock = product.stock - item.qty;
    //     await product.save();
    //   }
    // });

    // Respond with the created order details
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Order creation failed", error });
  }
};


exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find();

    res.status(200).json({"orders":orders})
  } catch (error) {
    res.status(400).json(error)
  }
}

