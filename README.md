# Exercise Tracker App

**Live Website**: [Exercise Tracker App](https://exercise-tracker-app-frontend-oc6q.onrender.com)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend API](#backend-api)
- [Learnings and Implementation](#learnings-and-implementation)
- [Future Improvements](#future-improvements)

## Overview

The **Exercise Tracker App** is a full-stack application that allows users to track their exercise routines by logging details such as the exercise name, duration, and date. The app provides a responsive and user-friendly interface for users to add, view, update, and delete their exercise records. This project showcases my learning and implementation of modern web development practices, including working with React for the frontend and Node.js, Express for the backend.

## Features

- Responsive design for mobile and desktop devices
- Add new exercises with details (name, duration, and date)
- View a list of all exercises
- Edit or delete individual exercises

## Technologies Used

### Frontend:
- **React** (UI library for building the app's interface)
- **Axios** (for making HTTP requests to the backend)
- **React Router** (for handling navigation between different pages)
- **CSS** (for styling the UI)
- **ESLint** (for maintaining code quality)

### Backend:
- **Node.js** with **Express** (for building the server and API)
- **MongoDB** (as the database for storing user data and exercises)
- **Mongoose** (for data modeling and database interactions)
- **CORS** (to allow communication between the frontend and backend)

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/archanaaaa/Exercise-Tracker-App.git
   cd Exercise-Tracker-App
   ```

2. Install the dependencies for both the frontend and backend:

   **Frontend**:
   ```bash
   cd client
   npm install
   ```

   **Backend**:
   ```bash
   cd backend
   npm install
   ```

3. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

4. Start the frontend development server:

   ```bash
   cd client
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Backend API

The backend API is built using Node.js and Express and provides endpoints for CRUD operations related to the exercises.

### Key Endpoints:
- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Logs in an existing user and returns a JWT.
- `GET /api/exercises`: Retrieves all exercises.
- `POST /api/exercises`: Adds a new exercise.
- `PUT /api/exercises/:id`: Updates an existing exercise.
- `DELETE /api/exercises/:id`: Deletes an exercise.

## Learnings and Implementation

### What I Learned:
1. **React and State Management**: This project allowed me to deepen my understanding of React hooks (`useState`, `useEffect`) and how to manage local component state.
   
2. **Routing in React**: I implemented `React Router` to create a multi-page experience without refreshing the page. This included routing to pages for adding exercises, viewing the exercise list, and editing exercises.

3. **Handling Forms in React**: I learned how to handle form inputs in React for both creating and editing exercises. This helped me better understand controlled components.

4. **Axios for API Requests**: I used `Axios` to communicate between the frontend and backend, sending HTTP requests (GET, POST, PUT, DELETE) to the backend server for managing exercise data.

5. **Building a RESTful API**: I built a REST API using `Node.js` and `Express`, where I created routes for CRUD operations on exercises. This included connecting to a MongoDB database using Mongoose and managing data models.

6. **Working with MongoDB**: I learned how to model data using Mongoose, and how to perform CRUD operations on a NoSQL database.

7. **Deployment**: I deployed the frontend and backend separately on Render.com. I learned about deployment workflows, environment variables, and handling the build process for production environments.

### Key Challenges and Solutions:
- **MIME Type Mismatch**: During deployment, I encountered a MIME type mismatch issue with my JavaScript files. I resolved this by correctly setting the `homepage` in my `package.json` to point to the live deployment URL.
  
- **CORS Issues**: While setting up communication between the frontend and backend, I faced CORS errors. I resolved this by configuring the CORS middleware in my backend to allow requests from the frontend.

## Future Improvements

1. **Improved Error Handling**: Implement more robust error handling both on the frontend (for form validation and API responses) and on the backend (using try-catch blocks and custom error messages).

2. **Unit and Integration Tests**: Implement unit testing using tools like Jest and Enzyme for React components and Mocha/Chai for backend testing.

3. **Pagination for Exercises**: Add pagination to the exercises list so that users can navigate through their exercise history more easily.

4. **Exercise Categories**: Implement exercise categories or tags for better organization and filtering of logged exercises.

5. **Data Visualization**: Add charts or graphs to visualize users' progress over time based on their logged exercises.
