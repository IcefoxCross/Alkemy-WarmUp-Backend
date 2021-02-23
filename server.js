const express = require('express');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req,res) => {
    res.json('Welcome to the Blog');
});

// Server Init
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});