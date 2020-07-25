const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    const err = new HttpError("Fetching users failed", 500);
    return next(err);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Signing up failed, try again?", 500);
    return next(err);
  }

  if (existingUser) {
    const err = new HttpError("User already exists!", 422);
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/fc/e7/00/fce70074-d3fb-4b09-e5d9-c748a2f9f65b/source/256x256bb.jpg",
    password,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (error) {
    const err = new HttpError("Signing up failed, try again?", 500);
    return next(err);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Logging in failed, try again?", 500);
    return next(err);
  }

  if (!existingUser || existingUser.password !== password) {
    const err = new HttpError("Invalid credentials, try again?", 401);
    return next(err);
  }

  res.json({
    message: "Logged in!",
    user: existingUser.toObject({ getters: true }),
  });
};

module.exports = {
  getUsers,
  signup,
  login,
};
