const express = require("express");

const router = express.Router();

const postController = require("../controllers/postsController");

const protect = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getSinglePost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

module.exports = router;
