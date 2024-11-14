const express = require("express");
const { createOrders, getOrders } = require("../controllers/orderControllers");
const router = express.Router();

router.route("/order").post(createOrders);
router.route("/getorders").get(getOrders)
module.exports = router;
// order route is created and exported