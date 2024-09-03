const {User, Blog, Comment} = require('../models');
const {format} = require('date-fns');

module.exports = {
    showHomePage(req, res) {
        res.render('homepage', {
            title: 'Tech Blog - Homepage'
        });
    },

    showRegisterPage(req, res) {
        res.render('register', {
            title: 'Tech Blog - Register Page',
            register: true
        });
    },

    showLoginPage(req, res) {
        res.render('login', {
            title: 'Tech Blog - Log In Page',
            login: true
        });
    },

    async showDashboardPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                include: [{
                    model:Blog,
                    include:[Comment, User]
                }] 
            });
 
            //Formats the date for each blog post
            const blogPost = user.blogPost.map(blog => {
                return {
                    ...blog.get({ plain: true }),
                    formattedDate: format(new Date(blog.date), 'dd/MM/yyyy')
                };
            });
            console.log(blogPost)
            res.render('dashboard', {
                title: 'Blog - Dashboard',
                user: user.get({ plain: true }),
                blogPost, 
                user_page: true,
                dashboard: true
            });
        } catch (error) {
            console.error('Error fetching user and blog posts:', error);
            res.status(500).send('Internal Server Error Occurred');
        }
    },

    async showAddPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });

            res.render('add', {
                user: user.get({ plain: true }),
                title: 'Blog - Add Post',
                user_page: true,
                add: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error Occurred');
        }
    }, async showEditPage(req, res) {
        try {
            const user = await User.findByPk(req.session.user_id, {
                attributes: ['username']
            });
            const blogPost = await Blog.findByPk(req.params.blogPost_id);
            console.log(blogPost)

            res.render('edit', {
                user: user.get({ plain: true }),
                title: 'Blog - Edit Post',
                blog: blogPost.get({ plain: true }),
                user_page: true,
                search: true
            });
        } catch (error) {
            console.log('Error rendering Add Page:', error);
            res.status(500).send('Internal Server Error Occured');
        }
    }

};
