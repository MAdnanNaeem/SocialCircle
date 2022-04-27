const asyncHandler = require("express-async-handler");

// This Goal variable ve many mongoose mathods for CRUD in our DB..
const Goal = require("../models/goalsModel");
const User = require("../models/userModel");
// @desc     Get   goals
// @route    GET  /api/goals
// @access   Private

// For err handling befr conn to db we used async promise and npm i express-async-handler
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc       Set    goal
// @route      POST  /api/goals
// @access     Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    // express error handler
    throw new Error("Please ! fill all the title field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc       Update  goal
// @route      PUT    /api/goals
// @access     Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found :( ... ");
  }

  // getting the user
  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found :(");
  }
  // authenticating the logged in user with the user who posted the goal
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized..");
  }

  const GoalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(GoalUpdated);
});

// @desc       Delete  goal
// @route      DELETE  /api/goals
// @access     Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal is not Found :)");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found :(");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized..");
  }

  await goal.remove();

  res.status(200).json({
    message: `This Goal ${req.params.id}  has been deleted :)`,
  });
});

//* exporting Variables to Routes file
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
