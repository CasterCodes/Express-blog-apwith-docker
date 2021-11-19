const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "this user already exits"],
  },
  password: {
    type: String,
    required: [true, "User password is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
