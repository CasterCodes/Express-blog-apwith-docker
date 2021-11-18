const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ status: "fail" });

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(404).json({ status: "fail" });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id, req.body);

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
};
