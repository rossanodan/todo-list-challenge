import React from 'react';

const Button = props => {
  const type = props.type || "button";
  const handleClick = props.handleClick;
  return <button type={type} onClick={handleClick}>{props.children}</button>
};

export default Button;