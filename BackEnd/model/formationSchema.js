const mongoose = require('mongoose')


const formationSchema = new mongoose.Schema({
    designation: {
        require: true,
        type: String
    },
    departement: {
        require: true,
        type: Object
    },
    modules: {
        type: Array
    }
})


module.exports = mongoose.model('Formation',formationSchema)