const { string, number } = require('@hapi/joi')
const mongoose = require('mongoose')


const Module = mongoose.Schema({
    designation: {
        type: String,
        require: true
    },
    horaire: {
        type: Number,
        require: true,
        min: 10,
        max: 100
    },
    formation: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('modules', Module)