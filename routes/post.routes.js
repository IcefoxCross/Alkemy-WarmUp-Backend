const controller = require('../controllers/post.controller');

module.exports = function(app) {
    app.get('/posts', controller.getPosts);
};