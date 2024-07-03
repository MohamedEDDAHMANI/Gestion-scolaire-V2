const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const {postEnseignent, getEnseignent, deleteEnseignent} = require('../controller/enseignantController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'enseignantImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

router.post('/create',upload.single('file'), postEnseignent)
router.get('/get', getEnseignent)
router.delete('/delete/:ensId/:forDesig', deleteEnseignent)


module.exports = router


