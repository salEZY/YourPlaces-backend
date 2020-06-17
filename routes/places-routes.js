const express = require("express");

const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
  addPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

// GET place by place ID
router.get("/:placeId", getPlaceById);

// GET place by user ID
router.get("/user/:userId", getPlaceByUserId);

// POST Add place
router.post("/", addPlace);

// PATCH update place
router.patch("/:placeId", updatePlace);

// DELETE delete place
router.delete("/:placeId", deletePlace);

module.exports = router;
