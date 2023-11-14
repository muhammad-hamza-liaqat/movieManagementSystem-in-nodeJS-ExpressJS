const express = require("express");
const app = express();
const { customerModel, validateCustomer} = require("../Models/CustomerModel");
const customerRoute = express.Router();;
const bcrypt = require("bcrypt");

customerRoute.route ('/add-customer')
.get((req,res)=>{
    res.end("add-customer get-method");

})
.post(async (req,res)=>{
    const {error } = validateCustomer(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { name, email, password } = req.body;
    const newCustomer = customerModel.create({
        ...req.body,
        password: hashedPassword
    });
    res.status(200).send("customer created!");
});

customerRoute.get('/find/:id', async (req,res)=>{
    let customerToFind = await customerModel.findById(req.params.id)
    if (!customerToFind){
        return res.status(400).send({message: "user with required ID not Found"});
    }
    // passing here customer name and isGold
    res.status(200).send({
        name: customerToFind.name,
        isGold : customerToFind.isGold
    });
});



module.exports = customerRoute