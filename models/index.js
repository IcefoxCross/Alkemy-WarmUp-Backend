const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB, config.USER, config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require('../models/Post')(sequelize, Sequelize);
db.category = require('../models/Category')(sequelize, Sequelize);

db.category.hasMany(db.post, {as: 'posts'});
db.post.belongsTo(db.category, {
    foreignKey: 'categoryId',
    as: 'category'
});

module.exports = db;