const express = require("express");
const upload= require("../middlewares/upload")
const {
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.route("/products").get(getProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/updateproduct/:id").put(updateProduct);

router.route("/deleteproduct/:id").delete(deleteProduct);

router.route("/addproduct").post(upload.array('images'),addProduct);


module.exports = router;
// product route added and exported