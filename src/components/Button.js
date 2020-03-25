import React from 'react';

const Button = props => {
  const type = props.type || "button";
  const handleClick = props.handleClick;
  return <button className={props.styleDef} type={type} onClick={handleClick}>{props.children}</button>
};

export default Button;