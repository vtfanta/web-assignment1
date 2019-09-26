const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var exercise = new Schema({
    numReps: {
        type: Number,
        required: true
    },
    numSets: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})



module.exports = exercise;