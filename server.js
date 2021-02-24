require('dotenv').config();
const express = require('express');

const app = express();

// Middlewares
app.use(express.json());

// DB
const db = require('./models');

const Post = db.post;
const Category = db.category;

/// Production init
//db.sequelize.sync();
/// Developer init
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and resync DB');
    initialize();
}).catch(err => console.log(err));

function initialize() {
    Category.create({name: 'Food'});
    Category.create({name: 'Social'}).then(category => {
        Post.create({
            title: 'Hello!',
            content: 'I like pizza, and you?',
            image: 'http://www.pizzareligion.com.au/wp-content/uploads/2017/03/Margherita.jpg',
            created_at: new Date(),
            categoryId: category.id
        });
    });
}

// Routes
app.get('/', (req,res) => {
    res.json('Welcome to the Blog');
});

// Server Init
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(Date(Date.now()).toString());
    console.log(`Server running on port ${PORT}`);
});