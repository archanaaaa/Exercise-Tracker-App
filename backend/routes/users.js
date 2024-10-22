// Create a route with Express
const router = require('express').Router();
let User = require('../models/user.model');

// Handle GET requests 
router.route('/').get((req, res) => {
    // Use a mongoose method to get all the users from the MongoDB
    User.find()
        .then(users => res.status(200).json(users)) // 200 OK
        .catch(err => res.status(500).json({ error: 'Error: ' + err.message })); // 500 Internal Server Error
});


// Handle post requests
router.route('/add').post((req,res)=>{
    console.log('Request Body:', req.body); // Log the entire request body
    const username = req.body.username;

    if (!username){
        return res.status(400).json({ error: 'Username is required' });    }

    // create a new instance of User using username input
    const newUser = new User({username});

    // save is a mangoose method that allows entry into the db
    // it also returns a promise once saved
    newUser.save()
        .then(() => res.status(201).json({ message: "User added!" })) // Respond with 201 Created
        .catch(err => res.status(400).json({ error: 'Error: ' + err.message })); // Send error response
});

module.exports = router;
