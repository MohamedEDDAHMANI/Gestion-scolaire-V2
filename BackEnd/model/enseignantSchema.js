const mongoose = require('mongoose')



const enseignant = new mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    spesialite: {
        type: String,
        require: true
    },
    modules: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('enseignant', enseignant)