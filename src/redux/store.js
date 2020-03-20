import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// tracking status //
let isTracking;
if (localStorage.getItem('isTracking') && localStorage.getItem('isTracking') === 'true') {
  isTracking = true;
} else {
  isTracking = false;
  localStorage.setItem('isTracking', isTracking);
}
// tracking status //

// todo list //
let todos;
if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
} else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify(todos));
}
// todo list //

// history //
let history;
if (localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem('history'));
} else {
  history = [];
  localStorage.setItem('history', JSON.stringify(history));
}
// history //

const initialState = {
  todos,
  form: {
    name: ''
  },
  isTracking,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TODO_ADD': {
      const { todo } = action.payload;

      // if tracking, update the history
      if (state.isTracking) {
        history.push(action);
        localStorage.setItem('history',  JSON.stringify(history));
      }

      todos.push(todo);
      localStorage.setItem('todos',  JSON.stringify(todos));

      return {
        ...state,
        todos: JSON.parse(localStorage.getItem('todos')),
        form: {
          name: ''
        }
      };
    };
    case 'INPUT_CHANGE': {
      const { name } = action.payload;
      return {
        ...state,
        form: {
          name
        }
      };
    };
    case 'TOGGLE_TRACK': {
      const { track } = action.payload;
      localStorage.setItem('isTracking', track);
      // use track variable to update the state
      // because the localstorage handle only strings
      return {
        ...state,
        isTracking: track
      };
    };
    case 'ACTION_CREATOR': {
      console.log('action creator');
      return state;
    };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;