// Create a route with Express
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// GET 
router.route('/').get((req, res) => {
    // Use a mongoose method to get all the users from the MongoDB
    Exercise.find()
        .then(exercises => res.status(200).json(exercises)) // 200 OK
        .catch(err => res.status(500).json({ error: 'Error: ' + err.message })); // 500 Internal Server Error
});

// POST
router.route('/add').post((req,res)=>{

    console.log('Request Body:', req.body); // Log the entire request body

    const { username, description, duration, date } = req.body;

    if (!username || !description || !duration || !date) {
        console.log('Invalid data received.');
        return res.status(400).json({ error: 'username, description, duration, date fields are required' });
    }

    // create a new instance of User using username input
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date: new Date(date) 
    });

    // save is a mangoose method that allows entry into the db
    // it also returns a promise once saved
    newExercise.save()
        .then(() => {
            console.log('Exercise saved successfully');
            res.status(201).json({ message: "Exercise added!" });
        })
        .catch(err => {
            console.error('Error saving exercise:', err.message);
            res.status(400).json({ error: 'Error: ' + err.message });
        });
});

// GET BY ID (automatically created by mongodb)
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => res.status(200).json(exercise)) // 200 OK
    .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response
})

// DELETE 
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(201).json({ message: "Exercise deleted!" })) // 201 OK
    .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response
})

// UPDATE
router.route('/update/:id').post((req,res)=>{

    console.log('Request ID:', req.params); 

    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.status(201).json({ message: "Exercise updated!" })) // 201 OK
        .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response
    })
    
    .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response 
  });


module.exports = router;
