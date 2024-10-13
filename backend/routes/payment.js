const express = require("express");
const { createPayment } = require("../controllers/paymentControllers");

const router = express.Router();

// Route to create a payment order
router.route("/get-payment").post(createPayment);

// Route to verify payment
// router.route("/verify-payment").post(verifyPayment);

module.exports = router;
