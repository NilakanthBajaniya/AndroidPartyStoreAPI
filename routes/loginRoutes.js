const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController')

console.log('into loginRoutes')
router.post('/user', loginController.loginUser)

module.exports = router