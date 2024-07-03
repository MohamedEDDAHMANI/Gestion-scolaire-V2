const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const {postSingUpUser, postLoginUser, getUserData, handleImageUpload} = require('../controller/userController')


router.post('/createUser', postSingUpUser)
router.post('/loginUser', postLoginUser)
router.get('/getData/:userId', getUserData)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'userImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/uploadPic/:id',upload.single('file'), handleImageUpload)

module.exports = router














