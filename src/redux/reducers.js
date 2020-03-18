const initialState = {
  todos: [],
  form: {
    todoName: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        form: {
          todoName: ''
        }
      };
    }
    case 'DELETE_TODO': {
      const todos = state.todos.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        todos,
      };
    }
    case 'CHANGE_INPUT': {
      return {
        ...state,
        form: {
          todoName: action.payload
        }
      };
    }
    default:
      return state;
  }
}
