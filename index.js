const express = require("express");
const app = express();
require("dotenv").config();
require("./database/connection");


const userRouter = require("./routes/userRoute");
const customerRouter = require("./routes/customerRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/user',userRouter);

app.use('/customer',customerRouter);


app.listen(process.env.PORT, ()=>{
    console.log(`server is running at localhost://${process.env.PORT}`)
});