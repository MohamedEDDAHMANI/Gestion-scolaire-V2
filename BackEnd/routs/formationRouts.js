const express = require('express')
const router = express.Router()
const {createFormation, getFormation, deleteFormation} = require('../controller/formationController') 



router.post('/create', createFormation)
router.get('/get', getFormation)
router.delete('/delete/:depId/:forId', deleteFormation)

module.exports = router