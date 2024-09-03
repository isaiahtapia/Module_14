const router = require('express').Router();
const user_controller = require('../controllers/user_controller');

//Register a User 
router.post('/register', user_controller.registerUser);

//Login a Returning User
router.post('/login', user_controller.loginUser);

//Log Out User
router.get('/logout', user_controller.logoutUser);

module.exports = router;