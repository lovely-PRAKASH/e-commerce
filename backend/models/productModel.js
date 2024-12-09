const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: String,
  ratings: {
    type: Number,
    required: [true, "Ratings are required"],
  },
  count: {
    type: Number,
    required: [true, "Product count is required"],
  },
  images: {
    type: [
      {
        image: { type: String, default: "/products/defaultImage.jpg" },
      },
    ],
    default: [{ image: "/products/defaultImage.jpg" }],
  },
  category: {
    type: String,
    required: [true, "Please enter a category"],
  },
  seller: String,
  stock: {
    type: Number,
  },
  offers: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure default image if images array is empty
productSchema.pre("save", function (next) {
  if (!this.images || this.images.length === 0) {
    this.images = [{ image: "/products/defaultImage.png" }];
  }
  next();
});

// Create the model AFTER defining middleware
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
