const express = require("express");
const { createRegisters, getUsers, checkAdminByEmail } = require("../controllers/registerControllers");
const router = express.Router();

router.route("/register").post(createRegisters);
router.route("/getusers").get(getUsers);
router.route("/checkadmin").get(checkAdminByEmail);


module.exports = router;
// register route added and exported