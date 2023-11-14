const express = require("express");
const app = express();
const { movieModel, validateMovie } = require("../Models/movieModel");
const { genreModel } = require("../Models/genreModel");
const movieRouter = express.Router();

movieRouter
  .route("/add-movie")
  .get((req, res) => {
    res.send("add-movie get-method");
  })
  .post(async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    genre = await genreModel.find({ name: req.body.genre });
    console.log(genre)

    const newMovie = await movieModel.create({
      ...req.body,
      genre: genre[0].name,
    });
    res.status(200).send("movie created!");
    console.log(newMovie);
  });

movieRouter.get("/find/:id", async (req, res) => {
  const movietoFind = await movieModel.findById(req.params.id);
  if (!movietoFind) {
    res.status(400).send({ message: "movie not found" });
  }
  res.send({
    title: movietoFind.title,
    numberInSeats: movietoFind.numberInSeats,
    price: movietoFind.price,
  });
});

module.exports = movieRouter;
