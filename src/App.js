import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import CreateExercise from './components/CreateExercise';
import ReadExercise from './components/ReadExercise';
import UpdateExercise from './components/UpdateExercise';
import CreateUser from './components/CreateUser'; 

function App() {
  return (
      <Router>
        <div className='container'>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ReadExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/edit/:id" element={<UpdateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;