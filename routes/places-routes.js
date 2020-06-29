const express = require("express");

const { check } = require("express-validator");

const router = express.Router();

const {
  getPlaceById,
  getPlacesByUserId,
  addPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places-controller");

// GET place by place ID
router.get("/:placeId", getPlaceById);

// GET place by user ID
router.get("/user/:userId", getPlacesByUserId);

// POST Add place
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  addPlace
);

// PATCH update place
router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);

// DELETE delete place
router.delete("/:placeId", deletePlace);

module.exports = router;
