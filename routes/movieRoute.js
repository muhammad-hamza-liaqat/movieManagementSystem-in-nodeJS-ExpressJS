const express = require("express");
const app = express();
const { movieModel, validateMovie } = require("../Models/movieModel");
const movieRouter = express.Router();

movieRouter.route("/add-movie").get((req, res) => {
  res.send("add-movie get-method");
})
.post(async(req,res)=>{
  const {error} = validateMovie(req.body)
  if(error){
    return res.status(400).send(error.details[0].message)
  }
  const newMovie = movieModel.create(req.body)
  res.status(200).send("movie created!")
});

movieRouter.get('/find/:id', async (req,res)=>{
    const movietoFind = await movieModel.findById(req.params.id)
    if(!movietoFind){
        res.status(400).send({message: "movie not found"})
    }
    res.send({title:movietoFind.title,
    numberInSeats: movietoFind.numberInSeats,
    price: movietoFind.price
    });
})

module.exports = movieRouter;
