const controller = require('../controllers/post.controller');
const validator = require('../middleware/post.validator');

module.exports = function(app) {
    app.get('/posts', controller.getPosts);
    app.get('/posts/:id', controller.getPost);
    app.post('/posts', validator.validateImagePost, controller.createPost);
    app.patch('/posts/:id', validator.validateImagePatch, controller.updatePost);
};