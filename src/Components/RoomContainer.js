import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Button from '@material-ui/core/Button';

import gql from "graphql-tag";
import dotenv from 'dotenv'

import RoomItem from './RoomComponents/RoomItem'
import {RoomsContainer, RoomItem as RoomItemStyle} from '../Style/Room'

dotenv.config()

const socket = openSocket(process.env.SOCKETURL);

class RoomContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
        rooms : []
      }
  }
  render() {
    const {rooms} = {...this.state}
    return (
      <div style={RoomsContainer}>
        <Button variant="contained" color = 'primary'>Make a Room</Button>
        {
          rooms.map((room) => {
            return (<RoomItem key={room._id} name={room.name} description={room.description} style={RoomItemStyle}/>)
          })
        }
      </div>
    );
  }

  componentWillMount(){
    fetch("http://localhost:4001/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({query: "{rooms{name description}}"})
    })
      .then(r => r.json())
      .then(data => this.setState({rooms:data.data.rooms}));
  }

}
export default RoomContainer
