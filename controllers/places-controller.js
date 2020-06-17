const { v4: uuid4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;

  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id!", 404)
    );
  }

  res.json({ places });
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

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.placeId;
  const placeToUpdate = {
    ...DUMMY_PLACES.find((place) => place.id === placeId),
  };

  if (!placeToUpdate) {
    throw new HttpError("Could not find a place for the provided id!", 404);
  }
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  placeToUpdate.title = title;
  placeToUpdate.description = description;
  DUMMY_PLACES[placeIndex] = placeToUpdate;

  res.status(200).json({ place: placeToUpdate });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);

  res.status(200).json({ message: "Place deleted!" });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  addPlace,
  updatePlace,
  deletePlace,
};
