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

exports.getPost = (req, res) => {
    const _id = req.params.id;
    Post.findOne({
        where: {id: _id},
        include: [{model: Category, attributes: ['name'], as: 'category'}],
        attributes: {exclude: ['categoryId']},
        raw: true
    }).then(post => {
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({message: 'Post not found.'});
        }
    }).catch(err => res.status(500).send({message: err.message}));
};