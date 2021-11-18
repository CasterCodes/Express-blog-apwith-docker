const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Title must be unique"],
      required: [true, "Blog title is required"],
    },

    body: {
      type: String,
      required: [true, "Blog body is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
