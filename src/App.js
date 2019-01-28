import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Style/Board.css';
import TicTacToeContainer from './Components/TicTacToeContainer'

import 'jquery'

import 'bootstrap'
import '@fortawesome/fontawesome-free'

class App extends Component {
  render() {
    return (
      <div className="App">

        <TicTacToeContainer/>




      </div>
    );
  }
}

export default App;
