const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const { getUsers, signup, login } = require("../controllers/users-controller");
const fileUpload = require("../middleware/file-upload");

// GET All users
router.get("/", getUsers);

// POST Sign up
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

// POST Login
router.post("/:login", login);

module.exports = router;
