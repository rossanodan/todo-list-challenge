import React, { Component } from "react";
import { connect } from 'react-redux';
import { playHistory } from './redux/actions';

import Button from './components/Button';
import Todo from './components/Todo';

import styles from './App.module.scss';

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
      <div data-test='appComponent'>
        <div className={styles.controlBarContainer}>
          <form className={styles.controlBar} onSubmit={this.handleSubmit}>
            <input
              className={styles.inputField}
              type='text'
              name='name'
              value={this.props.form.name}
              onChange={(event) =>  this.props.onInputChange(event.target.value)}
            />
            <Button
              type="submit"
              styleDef={styles.buttonGreen}
            >
              Add
            </Button>
            <div className={styles.recordingController}>
              <Button
                styleDef={styles.buttonRed}
                handleClick={() => this.props.toggleTrack(!this.props.isTracking)}
              >
                {this.props.isTracking ? 'Stop recording' : 'Record'}
              </Button>
              {this.props.isTracking ? null : (
                <>
                  <Button
                    styleDef={styles.buttonLightblue}
                    handleClick={() => this.props.onPlay()}
                  >
                    Play Recording
                  </Button>
                  <Button
                    styleDef={styles.buttonGray}
                    handleClick={() => this.props.onClear()}
                  >
                    Clear Recording
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className={styles.todosContainer}>
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
      </div>
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