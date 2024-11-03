const express = require("express");
const {
  getProduct,
  getSingleProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.route("/products").get(getProduct);

router.route("/product/:id").get(getSingleProduct);

module.exports = router;
// product route added and exported