const express = require("express");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //getting the Tokan
      token = req.headers.authorization.split(" ")[1];
      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // getting user from the token

      req.user = await User.findById(decoded.id).select("-password"); //password not included

      // Calling the next functions/ code
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized user");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized user ! No Token ..");
  }
});

module.exports = { protect };
