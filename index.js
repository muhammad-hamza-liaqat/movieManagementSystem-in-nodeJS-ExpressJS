const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const userRouter = require("./routes/userRoute");
app.use('/user',userRouter);


app.listen(process.env.PORT, ()=>{
    console.log(`server is running at localhost://${process.env.PORT}`)
});