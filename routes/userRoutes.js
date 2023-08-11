const express = require('express');
const router = express.Router()
const{register} = require('../controllers/usersController')

//router.get('/', authentication, authorization, login)
router.post('/register', register)


module.exports = router