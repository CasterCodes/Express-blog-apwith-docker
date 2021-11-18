const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, name, password: hashedPassword });

    req.session.user = user;

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "Invalid password or email",
      });

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword)
      return res.status(400).json({
        status: "fail",
        message: "Invalid password or email",
      });

    req.session.user = user;

    res.status(200).json({
      status: "success",
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
