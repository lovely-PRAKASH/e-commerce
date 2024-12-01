const { default: ProductModel } = require("../models/productModel");
const orderModel = require("../models/orderModel");

exports.createOrders = async (req, res, next) => {
  try {
    console.log(req.body)
    const { cartItems, shippingInfo, totalAmount, paymentSessionId, currencySymbol,convertedRate } = req.body; // Destructure properties from req.body

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
      currencySymbol,
      convertedRate,
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


exports.getOrderByEmail = async (req, res, next) => {
  console.log(req.query);
  try {
    const { email } = req.query; // Assuming email is passed as a query parameter

    if (!email) {
      return res.status(400).json({ error: "Email ID is required to fetch orders" });
    }

    const orders = await orderModel.find({ "shippingInfo.email": email }); // Assuming email is stored in `shippingInfo`

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for the given email ID" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
};

