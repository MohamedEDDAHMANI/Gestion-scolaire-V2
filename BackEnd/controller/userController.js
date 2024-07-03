const { User } = require('../model/userSchema');
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt');
const { error } = require('console');
const multer  = require('multer')
var jwt = require('jsonwebtoken');
const path  = require('path')


const postSingUpUser = async (req, res) => {
    try {
        //validation
    const authSchema = Joi.object({
        nom: Joi.string().required(),
        prenom: Joi.string().required(),
        userType: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })
    const result = await authSchema.validateAsync(req.body)

    var { nom, prenom, userType, email, password } = req.body;

        const saltRounds = 10; // Corrected variable name
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt); // Use correct variable name
        const data = await User.create({
            nom,
            prenom,
            userType,
            email,
            password 
        });
        const token = jwt.sign({userId: data._id}, 'you_cannot_gusse_that_secret' ,{
            expiresIn: '90d'
        })
        return res.status(201).send('created successfully');
    } catch (error) {
        if (error && error.details && error.details[0]) {
            console.log(error.details[0].message)
            return res.status(500).json(error.details[0].message);
        } else if (error._message){
            console.log(error._message)
            return res.status(500).json( error._message);
        } else {
            return res.status(500).json('Email already exists');
        }
    }
};


const postLoginUser = async (req, res) => {

    try {
        // cheking the email
        let user = await User.findOne({ email: req.body.emailSingin });
        if (!user) {
            return res.status(404).send('Invalid email...');
        }
        
        // cheking the password
        const isPasswordValid = await bcrypt.compare(req.body.passwordSingin, user.password);
        console.log(isPasswordValid)
        if (isPasswordValid) {

            const token = jwt.sign({userId: user._id}, 'you_cannot_gusse_that_secret' ,{
                expiresIn: '90d'
            })
            console.log(token);
            return res.status(201).json({userId: user._id, token});

        } else {
            return res.status(400).send('Invalid password');
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

const getUserData = async (req, res) => {
    try {
        const userId = req.params.userId
        console.log(userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user)
        res.json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal server error');
    }
}





const handleImageUpload = async  (req, res) => {
    
    
    console.log(req.file)

    await User.findByIdAndUpdate( req.params.id ,{
        picture: req.file.filename

    })
    .then(result => res.json({result}))
    .catch(err => console.log(err))
    
}



module.exports = { postSingUpUser, postLoginUser, getUserData, handleImageUpload};