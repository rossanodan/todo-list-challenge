import React, { Component } from "react";
import { connect } from 'react-redux';
import { playHistory } from './redux/actions';

import './App.css';

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
      this.props.onTodoAdd(this.props.form);
    }
  }

  render () {
    console.log(this.props);
    return (
      <>
        <div className='controlBarContainer'>
          <form className='controlBar' onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='name'
              value={this.props.form.name}
              onChange={(event) =>  this.props.onInputChange(event.target.value)}
            />
            <button type="submit">Add</button>
            <div className='recordingController'>
              <button
                onClick={() => this.props.toggleTrack(!this.props.isTracking)}
              >
                {this.props.isTracking ? 'Stop recording' : 'Record'}
              </button>
              {this.props.isTracking ? null : (
                <>
                  <button
                    onClick={() => this.props.onPlay()}
                  >
                    Play Recording
                  </button>
                  <button
                    onClick={() => this.props.onClear()}
                  >
                    Clear Recording
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className='todosContainer'>
          {
            this.props.todos.map(todo => (
              <div
                key={todo.id}
              >
                <p>{todo.name}</p>
                <button onClick={() => this.props.onTodoEdit(todo)}>Edit</button>
                <button onClick={() => this.props.onTodoDelete(todo)}>Delete</button>
              </div>
            ))
          }
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
    onTodoDelete: (todo) => dispatch({ type: 'TODO_DELETE', payload: { todo } }),
    onTodoEdit: (todo) => dispatch({ type: 'TODO_EDIT', payload: { todo } }),
    onInputChange: (name) => dispatch({ type: 'INPUT_CHANGE', payload: { name } }),
    toggleTrack: (track) => dispatch({ type: 'TOGGLE_TRACK', payload: { track } }),
    onPlay: () => dispatch(playHistory()),
    onClear: () => dispatch({ type: 'HISTORY_CLEAR' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);