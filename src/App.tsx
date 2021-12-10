import React from "react";
import logo from "./logo.svg";
import Board from "./components/board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default App;
