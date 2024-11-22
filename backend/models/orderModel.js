const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    fullName: String,
    email:String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String,
  },
  cartItems: Array,
  totalAmount: Number, // updated field name to match input
  paymentSessionId: String, // to store Stripe payment session ID
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
