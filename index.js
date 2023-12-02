const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");
const cors = require("cors");
const cron = require("node-cron");
const getWeather = require("./weather");

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

// cron task to run every minute
// cron.schedule('* * * * *', async () => {
//   console.log('Running cron job...');
//   try {
//     const weatherData = await getWeather();
//     console.log('Weather data:', weatherData);
//   } catch (error) {
//     console.error('Error in cron job:', error);
    
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

