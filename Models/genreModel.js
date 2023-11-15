const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const genrejoiScheme = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

const validateGenre = (name) => {
  return genrejoiScheme.validate(name);
};

module.exports = {
  genreModel: mongoose.model("genres", genreSchema),
  validateGenre,
  genreSchema,
};
