const { v4: uuid4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Place = require("../models/place");
const getCoordsForAddress = require("../util/location");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("Could not find a place. Try again?", 500);
    return next(err);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id!",
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError("Could not find  places. Try again?", 500);
    return next(err);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id!", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const addPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://res.volvox.rs//scripts/staticMapCreate.php?position=44.805466210309,20.493638214004",
    creator,
  });
  try {
    await newPlace.save();
  } catch (error) {
    const err = new HttpError("Creating place failed. Please try again!", 500);
    return next(err);
  }

  res.status(201).json({ place: newPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;

  let placeToUpdate;
  try {
    placeToUpdate = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("Could not update the place!", 500);
    return next(err);
  }

  placeToUpdate.title = title;
  placeToUpdate.description = description;

  try {
    await placeToUpdate.save();
  } catch (error) {
    const err = new HttpError("Could not update the place!", 500);
    return next(err);
  }

  res.status(200).json({ place: placeToUpdate.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("Could not delete the place!", 500);
    return next(err);
  }

  try {
    await place.remove();
  } catch (error) {
    const err = new HttpError("Could not delete the place!", 500);
    return next(err);
  }

  res.status(200).json({ message: "Place deleted!" });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  addPlace,
  updatePlace,
  deletePlace,
};
