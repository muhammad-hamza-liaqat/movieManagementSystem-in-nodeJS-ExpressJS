const mongoose = require("mongoose");

const jobSchema= new mongoose.Schema({
    Detail:{
        type: mongoose.Schema.Types.Mixed
    }
})

const Job = mongoose.model('jobs', jobSchema);
module.exports = Job