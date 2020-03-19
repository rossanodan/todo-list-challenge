let isTracking;
if (localStorage.getItem('isTracking')) {
  if (localStorage.getItem('isTracking') === 'true') {
    isTracking = true;
  } else {
    isTracking = false;
  }
} else {
  isTracking = false;
  localStorage.setItem('isTracking', isTracking);
}

let todos;
if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
} else {
  todos = [];
  localStorage.setItem('todos', JSON.stringify(todos));
}

const initialState = {
  todos,
  form: {
    name: ''
  },
  isTracking,
};

export default function(state = initialState, action) {
  let history;
  if (localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
  } else {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
  }

  switch (action.type) {
    case 'ADD': {
      const { todo } = action.payload;

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
    case 'CHANGE': {
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
      return {
        ...state,
        isTracking: track
      };
    };
    case 'CLEAR_HISTORY': {
      const history = [];
      localStorage.setItem('history', JSON.stringify(history));
      return state;
    }
    default:
      return state;
  }
}
