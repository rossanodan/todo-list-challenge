import React, { Component } from "react";
import { connect } from 'react-redux';

class App extends Component {
  constructor () {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTrack = this.toggleTrack.bind(this);
  }

  createTodo(todoName) {
    const now = new Date();

    return {
      id: now.getTime(),
      name: todoName,
      createdOn: now,
      done: false
    }
  }

  handleOnChange(event) {
    this.props.change(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.form.name.length < 1) {
      return;
    } else {
      this.props.add(this.createTodo(this.props.form.name));
    }
  }

  toggleTrack() {
    if (this.props.isTracking) {
      this.props.toggleTrack(false);
    } else {
      this.props.toggleTrack(true);
    }
  }

  render () {
    console.log(this.props);
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='todoName' value={this.props.form.name} onChange={this.handleOnChange} />
            <button type="submit" value="Add">Add</button>
          </form>
          <button onClick={() => this.toggleTrack()}>{this.props.isTracking ? 'Stop tracking' : 'Track'}</button>
        </div>
        <div>
          <ul>
            {this.props.todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
          </ul>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  form: state.form,
  isTracking: state.isTracking
});

const mapDispatchToProps = dispatch => {
  return {
    add: (todo) => dispatch({ type: 'ADD', payload: { todo } }),
    change: (name) => dispatch({ type: 'CHANGE', payload: { name } }),
    toggleTrack: (track) => dispatch({ type: 'TOGGLE_TRACK', payload: { track } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);