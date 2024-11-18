const express = require("express");
const {
  getProduct,
  getSingleProduct,
  updateProduct
} = require("../controllers/productControllers");
const router = express.Router();

router.route("/products").get(getProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/updateproduct/:id").put(updateProduct);


module.exports = router;
// product route added and exported