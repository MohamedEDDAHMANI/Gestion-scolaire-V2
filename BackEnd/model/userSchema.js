const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nom:{
        type: String,
        require: true,
        minlength: 3
    },
    prenom:{
        type: String,
        require: true
    },
    userType: {
        type: String,
        enum: ['Admin', 'Etudiant']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
        unique: [true,'this email already exists']
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    picture: {
        type: String
    } 
})



const User = mongoose.model('User', userSchema);

// Export the Model
module.exports ={ User };






