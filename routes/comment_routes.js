const router = require('express').Router();
const comment_controller = require('../controllers/comment_controller');

//Add a comment route
router.post('/add/:blogPost_id', comment_controller.addComment);

module.exports = router;