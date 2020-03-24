import React from 'react';

import Button from './Button';

const Todo = props => {
  const { todo, handleEdit, handleDelete } = props;
  return (
    <>
      <div>
        <p>{todo.name}</p>
        <Button
          handleClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          handleClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default Todo;