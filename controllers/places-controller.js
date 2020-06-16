const { v4: uuid4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
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
    id: "p2",
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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id!", 404);
  }

  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId;

  const place = DUMMY_PLACES.find((place) => place.creator === userId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id!", 404)
    );
  }

  res.json({ place });
};

const addPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const newPlace = {
    id: uuid4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(newPlace);
  res.status(201).json({ place: newPlace });
};

module.exports = {
  getPlaceById,
  getPlaceByUserId,
  addPlace,
};
