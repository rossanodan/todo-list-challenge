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
    id: null,
    name: '',
    createdOn: null,
    done: false
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

      // if todo.id already exists the action is edit
      // add otherwise
      const alreadyExistingTodo = todos.get().filter(t => todo.id === t.id);

      if (alreadyExistingTodo.length > 0) {
        todos.update(todo);
      } else {
        todos.add(todo);
      }

      return {
        ...state,
        todos: todos.get(),
        form: {
          id: null,
          name: '',
          createdOn: null,
          done: false
        },
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
    case 'TODO_EDIT': {
      // if tracking, update the history
      if (state.isTracking) {
        history.add(action);
      }

      const { id } = action.payload.todo;
      const target = todos.get().filter(todo => todo.id === id);

      return {
        ...state,
        form: {
          id: target[0].id,
          name: target[0].name,
          createdOn: target[0].createdOn,
          done: target[0].done
        }
      };

      // todos.delete(action.payload);

      // return {
      //   ...state,
      //   todos: todos.get()
      // };
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
      const now = new Date();

      return {
        ...state,
        form: {
          id: state.form.id || now.getTime(),
          name: name,
          createdOn: state.form.createdOn || now,
          done: state.form.done || false
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