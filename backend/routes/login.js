const express = require("express");
const { createLogin } = require("../controllers/loginControllers");

const router = express.Router();

router.route("/login").post(createLogin);

module.exports = router;
