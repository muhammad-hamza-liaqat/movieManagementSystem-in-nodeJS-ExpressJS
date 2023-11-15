const express = require("express");
const app = express();
const rentalModel  = require("../Models/RentalModel");
const rentalRoutes= express.Router();

rentalRoutes.route('/rental-detail')

.get((req,res)=>{
    res.end("rental-details get method")
})
.post(async (req,res)=>{
    
})


module.exports = rentalRoutes;