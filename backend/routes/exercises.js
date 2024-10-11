// Create a route with Express
const router = require('express').Router();
let Exercise = require("../models/exercise.model");

// Handle GET requests coming to this endpoint url
router.route('/').get((req,res) => {

    // Use a mangoose method to get all the users from the mongodb 
    // the find method returns a promise, return that as a response (res)
    Exercise.find()
        .then(exercises=>res.join(exercises))
        .catch(err=>res.status(400).json('Error: ',err));
});

// Handle post requests
router.route('/add').post((req,res)=>{

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

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
        .then(()=>res.join("Exercise added!"))
        .catch(err=>res.status(400).join('Error:',err));
});

module.exports = router;
