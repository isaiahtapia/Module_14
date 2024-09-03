const router =require('express').Router();

const view_controller = require('../controllers/view_controller');
const {redirectGuest, redirectUser} = require('./helpers/index')

//Homepage Route
router.get('/', redirectUser, view_controller.showHomePage);

//Register Route
router.get('/register', redirectUser, view_controller.showRegisterPage)

//Login Route
router.get('/login', redirectUser, view_controller.showLoginPage)

//Dashboard Route 
router.get('/dashboard', redirectGuest, view_controller.showDashboardPage)

//Add Page
router.get('/add', redirectGuest, view_controller.showAddPage)

//Edit Page
router.get('/edit/:blogPost_id', redirectGuest, view_controller.showEditPage)

module.exports = router