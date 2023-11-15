const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: "not verified",
    required: false,
  },
  verificationToken: {
    type: String,
  },
});

// adding more validations in userSchema via JOI module
const userJoiSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(5)
    .max(40)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .regex(/@(google|yahoo|gmail|icloud)\.com$/)
    .required(),

  password: Joi.string().min(5).max(25).required(),

  role: Joi.string().default("user"),
});

const validateUser = (user) => {
  return userJoiSchema.validate(user);
};

module.exports = {
  userModel: mongoose.model("users", UserSchema),
  validateUser,
};
