import React, { Component } from "react";
import { connect } from 'react-redux';

class App extends Component {
  constructor () {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

    if (this.props.form.todoName.length < 1) {
      return;
    } else {
      this.props.add(this.createTodo(this.props.form.todoName));
    }
  }

  handleDelete(id) {
    this.props.delete(id);
  }

  render () {
    console.log(this.props);
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='todoName' value={this.props.form.todoName} onChange={this.handleOnChange} />
            <button type="submit" value="Add">Add</button>
          </form>
        </div>
        <div>
          <ul>
            {this.props.todos.map(todo => <li key={todo.id} onClick={() => this.handleDelete(todo.id)}>{todo.name}</li>)}
          </ul>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({ todos: state.todos, form: state.form });

const mapDispatchToProps = dispatch => {
  return {
    add: (todo) => dispatch({ type: 'ADD_TODO', payload: todo }),
    delete: (id) => dispatch({ type: 'DELETE_TODO', payload: id }),
    change: (todoName) => dispatch({ type: 'CHANGE_INPUT', payload: todoName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);