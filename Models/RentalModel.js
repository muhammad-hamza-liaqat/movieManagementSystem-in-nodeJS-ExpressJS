const mongoose = require("mongoose");


const rentalSchema = new mongoose.Schema({
    name: String,
    customer: [{type: mongoose.Types.ObjectId, ref: 'customers'}]
});

const rentalModel= mongoose.model('rentals',rentalSchema)

module.exports = rentalModel

