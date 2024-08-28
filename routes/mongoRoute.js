require('dotenv').config();

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB server using environment variables
const mogoURI = "mongodb://" +
    process.env.MONGODB_USER + ":" +
    process.env.MONGODB_PASS + "@" +
    process.env.MONGODB_HOST + ":" +
    process.env.MONGODB_PORT;
//console.log(mogoURI);
mongoose.connect(mogoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_DB,
});

// Check if MongoDB connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connection successful!');
});

// Define the schemas for the collections
const subjectSchema = new mongoose.Schema({
    _id: String,
    subject_name: String,
    classes: [
        {
            _id: String,
            class_name: String,
            class_start_timestamps: [Date],
            class_end_timestamps: [Date],
            codes: [
                {
                    _id: String,
                    value: String,
                    expiry: Date,
                    users_selected: [String],    // user_name stored here
                    users_passed: [String]       // user_name stored here
                }
            ]
        }
    ]
});

const userSchema = new mongoose.Schema({
    _id: String,
    user_type: Number,              // 0: admin, 1: lecturer 2: student
    password_cleartext: String,     // NEED TO HASH AT LATER DATE
    first_name: String,
    last_name: String,
    photo_string: [Number],  // encoded string of the user's photo for facial recognition
    enrolment: [
        {
            _id: String,
            subject_id: String,
            class: String,              //classes object index stored here
            checkin_timestamps: [Date]

        }
    ]
});

const ticketSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    message: String,
    user_id: String,
    tick_complete: Boolean,
});

// Define the models for the collections
const Subject = mongoose.model('Subject', subjectSchema);
const User = mongoose.model('User', userSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

// GET Requests

// Define the GET request for the subjects collection
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

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

// Define the GET request for the tickets collection
router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
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

router.get('/getSubjectById', async (req, res) => {
    try {
        let subject = await Subject.findById(req.query.id);
        res.json(subject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/getSubjectsByUserId', async (req, res) => {
    try {
        let user = await User.findById(req.query.id);
        let subjectIds = user.enrolment.map(_class => _class.subject_id.toString());
        let subjects;
        if (user.user_type == 0) {
            subjects = await Subject.find();
        } else {
            subjects = await Subject.find().where('_id').in(subjectIds).exec();
        }
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// get tickets by user_id
router.get('/getTicketsByUserId', async (req, res) => {
    try {
        let tickets = await Ticket.find({ user_id: req.query.userID });
        res.json(tickets);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST Requests

// Define the POST request for the subjects collection
router.post('/subjects', async (req, res) => {
    try {
        const subjectData = req.body;
        const subject = new Subject(subjectData);
        await subject.save();
        res.json(subject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



// Define the POST request for the subjects collection
router.post('/updateSubjectById', async (req, res) => {
    try {
        const subjectData = req.body;
        //const subject = new Subject(subjectData);
        const updatedSubject = await Subject.findOneAndUpdate(
            { _id: subjectData._id }, subjectData,
            { new: true, upsert: true }
        );
        //await subject.save();
        res.json(updatedSubject);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// // Define the POST request for the subjects collection
// router.post('/subjects', async (req, res) => {
//     try {
//         const subjectData = req.body;
//         console.log(subjectData)
//         // Find the existing subject by ID and update it with the new data
//         const updatedSubject = await Subject.findByIdAndUpdate(subjectData._id, subjectData);

//         if (!updatedSubject) {
//             // If no existing subject found with the given ID, send a 404 error response
//             return res.status(404).json({ error: 'Subject not found.' });
//         }

//         res.json(updatedSubject);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });

// Define the POST request for the users collection
router.post('/users', async (req, res) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save({ upset: true });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//Update the user enrolment through post request
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

// POST Request for tickets collection
router.post('/tickets', async (req, res) => {
    try {
        const ticketData = req.body;
        const ticket = new Ticket(ticketData);
        await ticket.save();
        res.json(ticket);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST request to update ticket
router.post('/ticket_update', async (req, res) => {
    try {
        console.log(req.body);

        // Create a filter for ticket with the passed in id
        const filter = { _id: req.body._id };

        /* Set the upsert option to insert a document if no documents match
        the filter */
        const options = { upsert: true };

        // Specify the update to set a new value for the tick_complete field
        const updateDoc = {
            $set: {
                tick_complete: req.body.tick_complete
            },
        };

        // Update the first document that matches the filter
        const result = await Ticket.updateOne(filter, updateDoc, options);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
