const {Comment} = require('../models');

module.exports = {
    async addComment(req, res) {
        try {
            //Creates a Comment
            const newComment = await Comment.create({
                content: req.body.content,
                blogPostId: req.params.blogPost_id,
                userId: req.session.user_id
            });

            res.redirect('/dashboard')

        } catch (error) {
            console.log('Error Occurred: Unable to add comment', error);
            res.status(500).send('Internal Server Error Occurred');
        }
    },
};