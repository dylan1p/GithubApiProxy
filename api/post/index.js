const express = require("express");
const controller = require("./post.controller");

const router = express.Router();
const { isAuthenticated } = require("../middleware");

router.post("/", isAuthenticated, controller.createPost);
router.get("/list", isAuthenticated, controller.getPosts);
router.get("/:id", isAuthenticated, controller.getPostById);
router.put("/:id", isAuthenticated, controller.updatePost);
router.put("/:id/deactivate", isAuthenticated, controller.deactivatePost);

module.exports = router;
