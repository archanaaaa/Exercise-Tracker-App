import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        // bind the 'this' variable to all the functions, otherwise it will show undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        // to create variables in  react, use state
        // Users array: in our website we'll have a dropdown of all the users currently in the db

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e){
        // prevent default behavior of html form submission
        e.preventDefault();

        // Varibale declarations only inside methods
        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));

        // Once submitted, keep the user on the same page, set user to blank to add more
        this.setState({
            username:''
        })
    }
    
        render() {
        return (
            <div>
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input type="text"
                required
                className='form-control'
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}