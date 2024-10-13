const express = require("express");
const { createRegisters } = require("../controllers/registerControllers");
const router = express.Router();

router.route("/register").post(createRegisters);

module.exports = router;
