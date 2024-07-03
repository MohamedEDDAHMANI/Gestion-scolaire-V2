const express = require('express')
const router = express.Router()
const { postModule, getModule, deleteModule } = require('../controller/moduleController')

router.post('/create', postModule)
router.get('/get', getModule)
router.delete('/delete/:moId/:forma', deleteModule)

module.exports = router