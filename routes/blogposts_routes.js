const router = require('express').Router();

const blogPost_controller = require('../controllers/blogPost_controller');

//Creates a Blog Post
router.post('/add', blogPost_controller.createPost);

//Updates a User's Blog Post
router.put('/edit/:blogPost_id', blogPost_controller.updatePost);

//Deletes a User's Blog Post
router.delete('/remove/:blogPost_id', blogPost_controller.deletePost);

module.exports = router;