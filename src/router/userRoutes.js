const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { saveUserProfile }  = require('../utils/commonFunctions')
const {validateAccessToken} = require("../middeleware/auth")

router.post('/register', saveUserProfile.single('profilePhoto'), userController.register);
router.post('/login', userController.login); 
router.get('/profile', validateAccessToken, userController.profile);

module.exports = router;