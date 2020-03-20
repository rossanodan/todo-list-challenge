import { createStore, applyMiddleware } from 'redux';
import history from '../HistorySingleton';
import todos from '../TodosSingleton';
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

const initialState = {
  todos: todos.get(),
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
        history.add(action);
      }

      todos.add(todo);

      return {
        ...state,
        todos: todos.get(),
        form: {
          name: ''
        }
      };
    };
    case 'TODO_DELETE': {
      // if tracking, update the history
      if (state.isTracking) {
        history.add(action);
      }

      todos.delete(action.payload);

      return {
        ...state,
        todos: todos.get()
      };
    };
    case 'TODO_CLEAR': {
      todos.clean()
      return {
        ...state,
        todos: todos.get()
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
    case 'HISTORY_CLEAR': {
      history.clean();
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