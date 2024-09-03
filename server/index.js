const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserModel = require('./models/Users');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error: ", err));

// Endpoint to get all users
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint to create a new user
app.post('/createUser', (req, res) => {
    console.log(req.body);
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint to get a user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint to update a user by ID (change POST to PUT)
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, { new: true })  // Return the updated document
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Endpoint to delete a user by ID
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(result => res.json({ message: "User deleted", result }))
        .catch(err => res.status(500).json({ error: err.message }));
});

const port = process.env.PORT || 5000;  // Default to port 5000 if not specified in .env

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
