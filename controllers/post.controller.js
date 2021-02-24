const { Sequelize } = require('../models');
const db = require('../models');
const Post = db.post;
const Category = db.category;

exports.getPosts = (req, res) => {
    Post.findAll({
        order: [['createdAt', 'DESC']],
        include: [{model: Category, attributes: ['name'], as: 'category'}],
        attributes: ['id', 'title', 'image', 'createdAt'],
        raw: true
    }).then(posts => {
        res.status(200).send(posts);
    }).catch(err => res.status(500).send({message: err.message}));
};