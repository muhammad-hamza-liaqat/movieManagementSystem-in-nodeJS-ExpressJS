const mongoose = require("mongoose");
const Joi = require("joi");

const customerScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required,
  },
  isGold: {
    type: Boolean,
    default: "No",
  },
});
const customerJoiScheme = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(5)
    .max(40)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .regex(/@(google|yahoo|gmail|icloud| outlook| hotmail)\.com$/)
    .required(),

  password: Joi.string().min(10).max(25).required(),

  isGold: Joi.string().default("no"),
});

// function to validate the joi scheme of object

const validateCustomer =(user)=>{
    return customerJoiScheme.validate(user);
}
module.exports ={
    customerModel: mongoose.model("customers", customerScheme),
    validateCustomer
};