const express = require("express");
const app = express();
const genreRoute = express.Router();
const { genreModel, validateGenre } = require("../Models/genreModel");

genreRoute
  .route("/add-genre")
  .get((req, res) => {
    res.end("add-genre get-method");
  })
  .post(async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newGenre = genreModel.create(req.body);
    res.status(200).send("genre created!");
  });

genreRoute.get("/find/:id", async (req, res) => {
  let genreToFind = await genreModel.findById(req.params.id);
  if (!genreToFind) {
    return res
      .status(400)
      .send({ message: "genre with required ID not Found" });
  }
  res.send(genreToFind.name);
});

module.exports = genreRoute;
