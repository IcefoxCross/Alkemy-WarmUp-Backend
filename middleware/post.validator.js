const {check, validationResult} = require('express-validator');

exports.validateImagePost = [
    check('image', 'Image link must be a PNG or JPG file')
        .matches(/(png|jpg)$/),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];

exports.validateImagePatch = [
    check('image', 'Image link must be a PNG or JPG file')
        .optional().matches(/(png|jpg)$/),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];