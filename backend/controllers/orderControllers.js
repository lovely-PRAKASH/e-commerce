const { default: ProductModel } = require("../models/productModel");
const orderModel = require("../models/orderModel");

// orderController api- api/v1/order/
exports.createOrders = async (req, res, next) => {
  console.log(req.body, 'data');
  // const order=orderModel.create(req.body);
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
  ).toFixed(2);
  // console.log(amount, "AMT");
  const status = "pending";
  const order = await orderModel.create({ cartItems, amount, status });

  // updating product stock
  // cartItems.forEach(async (item) => {
  //   const product = await ProductModel.findById(item.product._id);
  //   product.stock = product.stock - item.qty;
  //   await product.save();
  // });

  // res.json({
  //   success: true,
  //   order,
  // });
};
