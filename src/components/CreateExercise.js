import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            error: null,
            isSubmitting: false
        };
    }

    componentDidMount() {
        // Add error handling for the initial users fetch
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                this.setState({ 
                    error: "Failed to load users. Please try refreshing the page."
                });
            });
    }

    // Use arrow functions to avoid manual binding
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    onChangeDuration = (e) => {
        const duration = e.target.value ? Number(e.target.value) : 0;
        this.setState({ duration });
    }

    onChangeDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            this.setState({ date });
        }
    }

    validateForm = () => {
        const { username, description, duration, date } = this.state;
        if (!username) return "Username is required";
        if (!description) return "Description is required";
        if (!duration || duration <= 0) return "Duration must be greater than 0";
        if (!date || !(date instanceof Date) || isNaN(date)) return "Valid date is required";
        return null;
    }

    onSubmit = async (e) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (this.state.isSubmitting) return;

        // Reset error state
        this.setState({ error: null, isSubmitting: true });

        // Validate form
        const validationError = this.validateForm();
        if (validationError) {
            this.setState({ error: validationError, isSubmitting: false });
            return;
        }

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date.toISOString()
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/exercises/add',
                exercise,
                {
                    timeout: 5000, // 5 second timeout
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Exercise added successfully:", response.data);
            window.location = "/";
        } catch (error) {
            console.error("Error submitting exercise:", error);
            
            let errorMessage = "Failed to submit exercise. ";
            if (error.code === "ECONNABORTED") {
                errorMessage += "Request timed out. Please try again.";
            } else if (error.response) {
                errorMessage += error.response.data.error || "Please try again.";
            } else if (error.request) {
                errorMessage += "Server not responding. Please check your connection.";
            } else {
                errorMessage += "An unexpected error occurred.";
            }

            this.setState({ 
                error: errorMessage,
                isSubmitting: false
            });
        }
    }

    render() {
        const { error, isSubmitting } = this.state;

        return (
            <div className="container mt-3">
                <h3>Create New Exercise Log</h3>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group mb-3">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {this.state.users.map(user => (
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
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Duration (in minutes): </label>
                        <input
                            type="number"
                            required
                            min="1"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Exercise Log'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}