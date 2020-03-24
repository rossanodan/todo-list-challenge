import React, { Component } from "react";
import { connect } from 'react-redux';
import { playHistory } from './redux/actions';

import Button from './components/Button';
import Todo from './components/Todo';

import './App.css';

class App extends Component {
  constructor () {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
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
            <Button type="submit">Add</Button>
            <div className='recordingController'>
              <Button
                handleClick={() => this.props.toggleTrack(!this.props.isTracking)}
              >
                {this.props.isTracking ? 'Stop recording' : 'Record'}
              </Button>
              {this.props.isTracking ? null : (
                <>
                  <Button
                    handleClick={() => this.props.onPlay()}
                  >
                    Play Recording
                  </Button>
                  <Button
                    handleClick={() => this.props.onClear()}
                  >
                    Clear Recording
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className='todosContainer'>
          {
            this.props.todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                handleEdit={() => this.props.onTodoEdit(todo)}
                handleDelete={() => this.props.onTodoDelete(todo)}
              />
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