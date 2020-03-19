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

let history;
if (localStorage.getItem('history')) {
  history = JSON.parse(localStorage.getItem('history'));
} else {
  history = [];
  localStorage.setItem('history', JSON.stringify(history));
}

const initialState = {
  todos: [],
  form: {
    name: ''
  },
  isTracking,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD': {
      const { todo } = action.payload;

      // if tracking, store the action
      if (state.isTracking) {
        history.push(action);
        localStorage.setItem('history',  JSON.stringify(history));
      }

      return {
        ...state,
        todos: [...state.todos, todo],
        form: {
          name: ''
        }
      };
    };
    // case 'DELETE_TODO': {
    //   const todos = state.todos.filter(todo => todo.id !== action.payload);
    //   return {
    //     ...state,
    //     todos,
    //   };
    // }
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
      console.log('Toggle track', action.payload);
      const { track } = action.payload;
      localStorage.setItem('isTracking', track);
      return {
        ...state,
        isTracking: track
      };
    };
    default:
      return state;
  }
}
