const express = require('express')
const router = express.Router()
const { postDepartement, getDepartement, deleteDepartement } = require('../controller/departementController')


router.post('/create', postDepartement)
router.get('/get', getDepartement)
router.delete('/delete/:id', deleteDepartement)

module.exports = router