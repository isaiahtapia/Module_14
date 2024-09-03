// const router = require('express').Router();
const { BlogPost } = require('../models');


module.exports = {
    async createBlogPost (req, res){
        const formData = req.body
        console.log(formData)
        try {
            await BlogPost.create({
                ...formData,
                userId: req.session.user_id
            })
            res.redirect('/dashboard')
        } catch (error) {
            console.log('add error', error);
            const errors = error.errors.map((errorObj) => {
              return {
                message: errorObj.message
              }
            })
            res.redirect('/add')
        }
    },
    async updateBlogPost(req, res){
        await BlogPost.update(
            req.body,
            {
                where:{
                    id: req.params.blogPost_id
                },
                returning: true,
                plain: true
            }
        )
        res.redirect('/dashboard')
    },
    async deleteBlogPost(req, res){
        await BlogPost.destroy({
            where: {
                id: req.params.blogPost_id
            }
        })
        res.redirect('/dashboard')
    }
}