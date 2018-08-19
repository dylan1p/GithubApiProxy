const express = require("express");
const controller = require("./localUser.controller");

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/authenticate", controller.authenticateUser);

module.exports = router;
