const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

// @Routes Method 2

//*Get Route & Create Route
router.route("/").get(getGoals).post(setGoal);

//* Update Route
router.route("/:id").put(updateGoal).delete(deleteGoal);

// TODO: All the routes will go above the 'module.export'..

module.exports = router;

// @Routes Method 1

/*
//*Get Route
router.get("/", getGoals);

//* Create Route
router.post("/", setGoal);

//* Update Route
router.put("/:id", updateGoal);

//* Delete Route
router.delete("/:id", deleteGoal);
*/
