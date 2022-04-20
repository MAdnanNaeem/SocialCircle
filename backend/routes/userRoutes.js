const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
