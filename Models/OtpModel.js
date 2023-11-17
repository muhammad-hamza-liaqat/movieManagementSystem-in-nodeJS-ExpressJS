const mongoose = require("mongoose");

const jobSchema= new mongoose.Schema({
    Detail:{
        type: String
    }
})

const Job = mongoose.model('otp', jobSchema);
module.exports = Job