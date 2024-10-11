// Create a route with Express
const router = require('express').Router();
let Exercise = require("../models/exercise.model");

// Handle GET requests
router.route('/').get((req, res) => {
    // Use a mongoose method to get all the users from the MongoDB
    Exercise.find()
        .then(exercises => res.status(200).json(exercises)) // 200 OK
        .catch(err => res.status(500).json({ error: 'Error: ' + err.message })); // 500 Internal Server Error
});


// Handle post requests
router.route('/add').post((req,res)=>{

    console.log('Request Body:', req.body); // Log the entire request body

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    if (!username || !description || !duration || !date){
        return res.status(400).json({ error: 'username, description, duration, date fields are required' });    }

    // create a new instance of User using username input
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    // save is a mangoose method that allows entry into the db
    // it also returns a promise once saved
    newExercise.save()
        .then(() => res.status(201).json({ message: "Exercise added!" })) // Respond with 201 Created
        .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response
});

module.exports = router;
