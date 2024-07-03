const express = require('express')
const router = express.Router()
const {postClasse, getClasse, deleteClasse} = require('../controller/classeController')

router.post('/create', postClasse)
router.get('/get', getClasse)
router.delete('/delete/:classeID/:forDesi', deleteClasse)

module.exports = router