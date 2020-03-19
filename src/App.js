import React, { Component } from "react";

class App extends Component {
  constructor () {
    super();

    let isTracking;
    if (localStorage.getItem('isTracking')) {
      isTracking = localStorage.getItem('isTracking');
      console.log('isTracking exists', isTracking);
    } else {
      isTracking = false;
      localStorage.setItem('isTracking', isTracking);
      console.log('isTracking does not exist', isTracking);
    }

    this.state = {
      todos: [],
      form: {
        name: ''
      },
      isTracking,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTracking = this.toggleTracking.bind(this);
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
    this.setState({
      form: {
        name: event.target.value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.form.name.length < 1) {
      return;
    } else {
      this.setState({
        todos: [...this.state.todos, this.createTodo(this.state.form.name)],
        form: {
          name: ''
        }
      });
    }
  }

  isTracking() {
    const isTracking = localStorage.getItem('isTracking');
    if (isTracking === 'true') {
      return true;
    } else {
      return false;
    }
  }

  toggleTracking() {
    if (this.isTracking()) {
      localStorage.setItem('isTracking', false);
      this.setState({
        isTracking: false
      });
    } else {
      localStorage.setItem('isTracking', true);
      this.setState({
        isTracking: true
      });
    }
  }

  render () {
    console.log(this.state);
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='todoName' value={this.state.form.name} onChange={this.handleOnChange} />
            <button type="submit" value="Add">Add</button>
          </form>
          {this.isTracking() ? (<button onClick={() => this.toggleTracking()}>Stop tracking</button>) : (<button onClick={() => this.toggleTracking()}>Track</button>)}
        </div>
        <div>
          <ul>
            {this.state.todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
          </ul>
        </div>
      </>
    );
  }
}

export default App;