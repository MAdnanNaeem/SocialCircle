const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  // Strong data from body into the variable

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400); //Bad request status
    throw new Error("Please fill all the filds..");
  }

  // Check if the User already exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //bad request
    throw new Error("User already Exists...");
  }

  // Hash the Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: hashedPassword,
    }); //Status for Okay and something created
  } else {
    res.status(400);
    throw new Error("Invalid User Data :(");
  }

  // res.json({
  //   message: "User has been registered .. :) ",
  // });
});

const loginUser = asyncHandler(async (req, res) => {
  // save data into a variable from req.body
  const { email, password } = req.body;
  // check the user existance
  const user = await User.findOne({ email });
  // if user found check the password and email

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "User data..." });
});

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: `User ${req.params.id} has been updated..` });
});

const deleteUser = asyncHandler(async (req, res) => {
  res.json({
    message: `User ${req.params.id} has been Deleted`,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
