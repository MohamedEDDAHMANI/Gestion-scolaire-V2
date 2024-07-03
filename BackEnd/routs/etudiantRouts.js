const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const {postEtudiant, getEtudiant, deleteEtudiant} = require('../controller/etudiantController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'enseignantImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


router.post('/create',upload.single('file'), postEtudiant)
router.get('/get', getEtudiant)
router.delete('/delete/:etudiantId/:classeDesig', deleteEtudiant)


module.exports = router