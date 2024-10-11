// Create a route with Express
const router = require('express').Router();
let User = require("../models/user.model");

// Handle GET requests coming to this endpoint url
router.route('/').get((req,res) => {

    // Use a mangoose method to get all the users from the mongodb 
    // the find method returns a promise, return that as a response (res)
    User.find()
        .then(users=>res.join(users))
        .catch(err=>res.status(400).json('Error: ',err));
});

// Handle post requests
router.route('/add').post((req,res)=>{

    const username = req.body.username;

    // create a new instance of User using username input
    const newUser = new User({username});

    // save is a mangoose method that allows entry into the db
    // it also returns a promise once saved
    newUser.save()
        .then(()=>res.join("User added!"))
        .catch(err=>res.status(400).join('Error:',err));
});

module.exports = router;
