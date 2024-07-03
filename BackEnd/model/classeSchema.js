const mongoose = require('mongoose')


const classeSchema = new mongoose.Schema({
    designation: {
        type: String,
        require: true
    },
    formation: {
        type: String,
        require: true
    },
    nombreMaximal: {
        type: Number,
        default: 25 // Set the fixed number here
    }
    
})

module.exports = mongoose.model('classe', classeSchema)