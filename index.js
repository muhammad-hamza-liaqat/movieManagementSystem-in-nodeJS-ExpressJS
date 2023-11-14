const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");


const userRouter = require("./routes/userRoute");
const customerRouter = require("./routes/customerRoute");
const genereRouter = require("./routes/genreRoute");
const movieRoute = require("./routes/movieRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/user',userRouter);

app.use('/customer',customerRouter);

app.use('/genre', genereRouter);

app.use('/movie', movieRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at localhost://${process.env.PORT}`)
});