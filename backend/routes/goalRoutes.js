const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middlewares/authMiddleware");

// @Routes Method 2

//*Get Route & Create Route
router.route("/").get(protect, getGoals).post(protect, setGoal);

//* Update Route
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

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
