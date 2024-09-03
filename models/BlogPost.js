const {DataTypes} = require('sequelize');
const client = require('../config/connection');

const BlogPost = client.define('BlogPost', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = BlogPost;