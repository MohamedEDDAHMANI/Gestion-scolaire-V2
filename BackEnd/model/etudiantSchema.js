const mongoose = require('mongoose')



const etudiantSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    dateDeNaissance: { 
        type: Date,
        required: true 
    },
    classe: { 
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('etudiant', etudiantSchema)