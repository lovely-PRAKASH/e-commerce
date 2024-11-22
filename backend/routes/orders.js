const express = require("express");
const { createOrders, getOrders, getOrderByEmail } = require("../controllers/orderControllers");
const router = express.Router();

router.route("/order").post(createOrders);
router.route("/getorders").get(getOrders)
router.route("/orderbyemail").get(getOrderByEmail)

module.exports = router;
// order route is created and exported