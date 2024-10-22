import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        // bind the 'this' variable to all the functions, otherwise it will show undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        // to create variables in  react, use state
        // Users array: in our website we'll have a dropdown of all the users currently in the db

        this.state = {
            username: '',
            description: '',
            duration:0,
            date: new Date(),
            users: []
        }
    }

    // React has some lifecycle methods, that it automatically calls at various points.
    // componentDidMount will be called: before anything is displayed on the screen/before anything loads
    componentDidMount() {
        // Usually we will populate the data from MongoDB, for now let us hardcode the data
        this.setState({
            users:['test user'],
            username: 'test user'
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        // prevent default behavior of html form submission
        e.preventDefault();

        console.log(this.state);  

        // Varibale declarations only inside methods
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // Once submitted, go back to homepage/to the list of exercises
        window.location = "/";
    }

        render() {
        return (
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                        // value: sets the user name to value, and >{user} displays it. SEE COMMENT BLOCK BELOW

                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input 
                    type="text" 
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
              </div>
              <div className="form-group">
                <label>Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>
    
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}

/*

this.state.users.map(function(user) {
    return <option 
    // value: sets the user name to value, and >{user} displays it 

      key={user}
      value={user}>{user}
      </option>;
  })

this is similar to :

If this.state.users = ['Alice', 'Bob', 'Charlie'], then the generated options will look like this:

jsx: 

<option value="Alice">Alice</option>
<option value="Bob">Bob</option>
<option value="Charlie">Charlie</option>

*/