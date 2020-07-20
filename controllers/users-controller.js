const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "salEzY",
    email: "test@test.com",
    password: "test",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password, places } = req.body;
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
      "https://lh3.googleusercontent.com/proxy/T_0CZXBK4d73SxPUzwLDgWjt2Cwk5TwmX1BDMoFsU-OcnmyYYulwPRDlC-p4RRHsMV98LFoxer4lAJd9DAslKvQKBqjnzAkaIg3eeXyTMh5XpaiY5t00o-lAirg2LDNYp_KnQDRkrRJzf5IAcvx83FNgEgys",
    password,
    places,
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

  res.json({ message: "Logged in!" });
};

module.exports = {
  getUsers,
  signup,
  login,
};
