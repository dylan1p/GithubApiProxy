const express = require("express");
const controller = require("./user.controller");

const router = express.Router();

router.get("/", controller.getUsers);
module.exports = router;
