const express = require('express')
const UserController = require('../controller/UserController')
const router = express.Router()

//usercontroller
router.get('/getalluser',UserController.getalluser)
router.get('/userinsert',UserController.userinsert)




module.exports = router