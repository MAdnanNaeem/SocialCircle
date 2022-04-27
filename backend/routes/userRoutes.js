const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
