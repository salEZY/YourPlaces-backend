const express = require("express");

const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
  addPlace,
} = require("../controllers/places-controller");

// GET place by place ID
router.get("/:placeId", getPlaceById);

// GET place by user ID
router.get("/user/:userId", getPlaceByUserId);

// POST Add place
router.post("/", addPlace);

module.exports = router;
