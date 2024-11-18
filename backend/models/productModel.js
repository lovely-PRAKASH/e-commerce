const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"]
  },
  price: {
    type: Number,
    required: [true, "price is required"]
  },
  description: String,
  ratings: {
    type: Number,
    required:[true, "ratings is required"]
  },
  count: {
    type: Number,
    required: [true, "product count is required"]
  },
  images: [
    {
      image: String,
    },
  ],
  category: {
    type: String,
    required: [true, "please enter category"]
  },
  seller: String,
  stock: {
    type: Number
  },
  offers: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
