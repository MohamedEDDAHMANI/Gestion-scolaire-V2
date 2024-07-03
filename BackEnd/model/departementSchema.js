const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const departementSchema = new Schema({
    designation: {
        type: String,
    },
    formation: [{ 
        designation: {
            type: String
        },
        enseignant: [{
            nom: {
                type: String,
            },
            prenom: {
                type: String,
            },
            spesialite: {
                type: String,
            },
            formation: {
                type: String,
            },
            picture: {
                type: String
            } 
        }],
        modules: [{
            designation: {
                type: String
            },
            horaire: {
                type: Number,
                min: 10,
                max: 100
            },
            enseignant: {
                type: String,
            },
            formation: {
                type: String,
            }
        }],
        classe: [{
            designation: {
                type: String,
            },
            formation: {
                type: String,
            },
            nombreMaximal: {
                type: Number,
                default: 25 
            },
            etudiant: [{
                nom: {
                    type: String,
                },
                prenom: {
                    type: String,
                },
                dateDeNaissance: { 
                    type: Date,
                },
                classe: {
                    type: String,
                },
                picture: {
                    type: String
                } 
            }]
        }]
    }]
    
})



module.exports = mongoose.model('departement', departementSchema)