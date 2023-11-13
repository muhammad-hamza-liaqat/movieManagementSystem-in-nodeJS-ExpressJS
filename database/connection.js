const mongoose = require("mongoose");
// connecting database

mongoose
  .connect("mongodb://localhost:27017/moviesDataBase")
  .then(() => {
    console.log("mongoDB connected!");
  })
  .catch((err) => {
    console.log("mongoDB not connected!");
  });