import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <h1>Hello, React</h1>
  );
}

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;