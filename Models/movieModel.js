const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genreModel");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInSeats: {
    type: Number,
    required: true,
  },
  dateOfRelease: {
    type: Date,
    validate: {
      validator: function (value) {
        return value < new Date();
      },
    },
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});
const movieJoiSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  price: Joi.number().min(200).max(10000).required(),
  //   minimum seats 50, max seats limit 1000
  numberInSeats: Joi.number().min(50).max(1000).required(),
  //   dailyRentalRate: Joi.number().min(200).max(10000).required(),
  // year-month-day  => example=> 2023-11-14
  dateOfRelease: Joi.date().max("now").required(),
  genre: Joi.object({
    name: Joi.string().min(3).max(50).required(),
  }).required(),
});

const validateMovie = (data) => {
  return movieJoiSchema.validate(data);
};

module.exports = {
  movieModel: mongoose.model("movies", movieSchema),
  validateMovie,
};
