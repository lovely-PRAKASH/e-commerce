const express = require("express");
const { createOrders } = require("../controllers/orderControllers");
const router = express.Router();

router.route("/order").post(createOrders);

module.exports = router;
