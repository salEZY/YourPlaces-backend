const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "u1",
    title: "Beograd",
    description: "NAJJACI GRAD",
    location: {
      lat: 44.8005828,
      lng: 20.4868401,
    },
    address: "Djevdjelijska 15",
    creator: "u1",
  },
  {
    id: "u2",
    title: "Beograd",
    description: "GRAD BEO",
    location: {
      lat: 44.807148,
      lng: 20.495167,
    },
    address: "Bore Prodanovica 9a",
    creator: "u2",
  },
];

router.get("/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);
  res.json({ place });
});

module.exports = router;
