const express = require("express");
const { createRegisters, getUsers } = require("../controllers/registerControllers");
const router = express.Router();

router.route("/register").post(createRegisters);
router.route("/getusers").get(getUsers);


module.exports = router;
// register route added and exported