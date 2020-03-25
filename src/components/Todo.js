import React from 'react';

import Button from './Button';

import styles from '../App.module.scss';

const Todo = props => {
  const { todo, handleEdit, handleDelete } = props;
  return (
    <>
      <div>
        <p>{todo.name}</p>
        <Button
          styleDef={styles.buttonLightblue}
          handleClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          styleDef={styles.buttonRed}
          handleClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default Todo;