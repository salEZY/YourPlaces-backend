const express = require("express");

const router = express.Router();

const { getUsers, signup, login } = require("../controllers/users-controller");

// GET All users
router.get("/:placeId", getUsers);

// POST Sign up
router.post("/signup", signup);

// POST Login
router.post("/:login", login);

module.exports = router;
