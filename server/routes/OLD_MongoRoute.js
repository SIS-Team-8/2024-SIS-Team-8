require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB server using environment variables
const mogoURI = process.env.MONGODB_URI;
//console.log(mogoURI);
mongoose.connect(mogoURI, {
    dbName: process.env.MONGODB_DB,
});

// Check if MongoDB connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection successful!');
});

const userSchema = new mongoose.Schema({
    _id: String,
    //user_type: Number,              // 0: admin, 1: user
    email: String,
    password_cleartext: String,     // NEED TO HASH AT LATER DATE
    first_name: String,
    last_name: String,
    journal: [
        {
            _id: String,
            time_code: [Date],
            emoji: String,      // change to int     // 0: happy, 1: sad, 2: angry, 3: anxious, 4: tired, 5: excited, 6: relaxed
            text: String,
            image: String
        }
    ]
});


// Define the models for the collections
const User = mongoose.model('User', userSchema);

// GET Requests
// Define the GET request for the users collection
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


router.get('/getUserById', async (req, res) => {
    try {
        let user = await User.findById(req.query.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// POST Requests

// Define the POST request for the users collection
// router.post('/users', async (req, res) => {
//     try {
//         const userData = req.body;
//         const user = new User(userData);
//         await user.save({ upset: true });
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

//Update the user enrolment through post request ## NEED TO UPDATE TO INTEGRATE DAILY EMOJI UPDATES THROUGH THIS ROUTE
router.post('/updateUserById', async (req, res) => {
    try {
        const userData = req.body;
        //const user = new User(userData);
        const updatedUser = await User.findOneAndUpdate(
            { _id: userData._id }, userData,
            { new: true, upsert: true }
        );
        //await user.save();
        console.log(`${res.statusCode}: ${res.statusMessage}`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
