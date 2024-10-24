import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch exercise data
    axios.get(`https://exercise-tracker-app-f7ap.onrender.com/exercises/${id}`)
      .then(response => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch(error => {
        console.log(error);
      });

    // Fetch users
    axios.get('https://exercise-tracker-app-f7ap.onrender.com/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const exercise = {
      username,
      description,
      duration,
      date
    };

    axios.post(`https://exercise-tracker-app-f7ap.onrender.com/exercises/update/${id}`, exercise)
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Duration (in minutes): </label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={date => setDate(date)}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
