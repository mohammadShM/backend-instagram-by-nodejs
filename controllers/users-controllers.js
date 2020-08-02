const { validationResult } = require("express-validator");
const User = require("../models/user");
const HttpError = require("../models/http-error");

const getUser = async (req, res, next) => {
   let users;
   try {
      users = await User.find({}, "-password");
   } catch (err) {
      const error = new HttpError("Getting users failed.", 401);
      return next(error);
   }
   res.status(200).json({
      users: users.map((user) => user.toObject({ getters: true })),
   });
};

const signup = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new HttpError("Invalid Inputs", 422);
   }
   const { name, email, password } = req.body;
   let existingUser;
   try {
      existingUser = await User.findOne({ email: email });
   } catch (err) {
      const error = new HttpError("Sing up failed.", 401);
      return next(error);
   }
   if (existingUser) {
      const error = new HttpError("User exist.", 422);
      return next(error);
   }
   const createdUser = new User({
      name: name,
      email: email,
      password: password,
      image: "url",
      posts: [],
   });
   try {
      await createdUser.save();
   } catch (err) {
      const error = new HttpError("Sign up failed.", 500);
      return next(error);
   }
   res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
   const { email, password } = req.body;
   let existingUser;
   try {
      existingUser = await User.findOne({ email: email });
   } catch (err) {
      const error = new HttpError("Login up failed.", 500);
      return next(error);
   }
   if (!existingUser || existingUser.password !== password) {
      const error = new HttpError("Invalid inputs.", 401);
      return next(error);
   }
   res.status(200).json({
      message: "Logged in",
      user: existingUser.toObject({ getters: true }),
   });
};

exports.getUser = getUser;
exports.signup = signup;
exports.login = login;
