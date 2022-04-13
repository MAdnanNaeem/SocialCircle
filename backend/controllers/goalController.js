const asyncHandler = require("express-async-handler");

// @desc     Get   goals
// @route    GET  /api/goals
// @access   Private

// For err handling befr conn to db we used async promise and npm i express-async-handler
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Here is the list of goals.......",
  });
});

// @desc       Set    goal
// @route      POST  /api/goals
// @access     Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);

    // express error handler
    throw new Error("Please ! fill all the title field");
  }

  res.status(200).json({
    message: "New goal has been created......",
  });
});

// @desc       Update  goal
// @route      PUT    /api/goals
// @access     Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Goal ${req.params.id} has been updated`,
  });
});

// @desc       Delete  goal
// @route      DELETE  /api/goals
// @access     Private

const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Goal ${req.params.id} has been deleted......`,
  });
});

//* exporting Variables to Routes file
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
