const express = require('express')
const router = express.Router()
const  {updateDepartement}  = require('../controller/updateController')


router.put('/all/:name', updateDepartement)


module.exports = router


