const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");
const cors = require("cors");

const userRouter = require("./routes/userRoute");
const customerRouter = require("./routes/customerRoute");
const genreRouter = require("./routes/genreRoute");
const movieRouter = require("./routes/movieRoute");
const rentalRouter = require("./routes/rentalRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/genre", genreRouter);
app.use("/movie", movieRouter);
app.use("/rental", rentalRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
