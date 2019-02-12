import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Style/Board.css';
import RoomContainer from './Components/RoomContainer'

import 'jquery'

import 'bootstrap'
import '@fortawesome/fontawesome-free'
import ApolloClient from "apollo-boost";
import dotenv from 'dotenv'
import { ApolloProvider } from "react-apollo";

dotenv.config()

const client = new ApolloClient({
  uri: process.env.GRAPHQLURL
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <RoomContainer/>
        </ApolloProvider>



      </div>
    );
  }
}

export default App;
