const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

// Have the env variables in the dotenv file
require('dotenv').config();

console.log('Env file loaded?', process.env.ATLAS_URI ? 'Yes' : 'No');
console.log('ATLAS_URI:', process.env.ATLAS_URI);

// Create our express server
const app = express();
const port = process.env.PORT || 5000

// Middleware cors - cross-origin resource sharing
app.use(cors());

// connect to DB, with uri of the db - from the MongoDB-Atlas dashboard
const uri = process.env.ATLAS_URI;
console.log('MongoDB URI:', process.env.ATLAS_URI);  // Debugging line
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection successful")
});

// Allows us to pass json
app.use(express.json());

// Tell the server to use the API endpoints (from routes folder)
const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

// This is the url that will be used at the end and the correspomnding route will be called
app.use('/exercises',exerciseRouter)
app.use('/users',userRouter)

// Start the server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})

/* 
process.env is a global object in Node.js that allows you to access environment variables in the system or 
the environment where the Node.js application is running. Environment variables are key-value pairs that 
provide configuration values outside of your code, such as API keys, database URLs, or port numbers.

    ~ process: This is a global object in Node.js that provides information about the current Node.js process.

    ~ process.env: This object contains the environment variables for the current process.

    ~ process.env.PORT: This accesses the PORT environment variable. In many deployment environments 
    (like Heroku, AWS, etc.), the hosting service assigns a port number that your app should listen to 
    via an environment variable.

    ~ || 5000: This is the logical OR operator. It means that if process.env.PORT is not defined (i.e., it 
    evaluates to undefined or null), then the server will default to port 5000. This is useful for local 
    development, allowing you to run your server without needing to set an environment variable.
*/

/* 

CORS stands for Cross-Origin Resource Sharing. It's a security feature in web browsers that controls how resources
(such as APIs or web pages) can be requested from a different domain (or origin) than the one from which the page 
was loaded.

By default, web browsers enforce a Same-Origin Policy, which means web applications running in one domain cannot 
access resources from another domain unless the server allows it explicitly through CORS headers.

Why is CORS needed?
When a web application running on one domain (e.g., http://example.com) tries to make a request (such as a GET or 
POST request) to another domain (e.g., http://api.example.com), the browser blocks the request by default due to 
security concerns, unless the second domain allows it through CORS headers.

CORS in Express with the cors package
In Node.js with Express, the cors package allows you to easily enable CORS in your application, giving control 
over which domains can access your server’s resources.

*/