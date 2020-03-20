import React, { Component } from "react";
import { connect } from 'react-redux';
import { actionCreator } from './redux/actions';

class App extends Component {
  constructor () {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.form.name.length < 1) {
      return;
    } else {
      this.props.onTodoAdd(this.createTodo(this.props.form.name));
    }
  }

  render () {
    console.log(this.props);
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='name'
              value={this.props.form.name}
              onChange={(event) =>  this.props.onInputChange(event.target.value)}
            />
            <button type="submit" value="Add">Add</button>
          </form>
          <button
            onClick={() => this.props.toggleTrack(!this.props.isTracking)}
          >
            {this.props.isTracking ? 'Stop tracking' : 'Track'}
          </button>
          <button
            onClick={() => this.props.actionCreator()}
          >
            Action Creator
          </button>
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
    onTodoAdd: (todo) => dispatch({ type: 'TODO_ADD', payload: { todo } }),
    onInputChange: (name) => dispatch({ type: 'INPUT_CHANGE', payload: { name } }),
    toggleTrack: (track) => dispatch({ type: 'TOGGLE_TRACK', payload: { track } }),
    actionCreator: () => dispatch(actionCreator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);