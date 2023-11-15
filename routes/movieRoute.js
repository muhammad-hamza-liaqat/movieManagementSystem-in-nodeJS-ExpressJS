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
    const { title, price, numberInSeats, dateOfRelease, genre } = req.body;
    const { error } = validateMovie({
      title,
      price,
      numberInSeats,
      dateOfRelease,
      genre,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const findGenre = await genreModel.findOne({ name: genre.name });
    console.log(findGenre)
    if (findGenre !== null) {
      const newMovie = await movieModel.create({
        title,
        price,
        numberInSeats,
        dateOfRelease,
        genre,
      });
      res.status(200).send("movie created!");
    }
    else{
      res.end("genre doesn't exist! movie can't be created!")
    }
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
