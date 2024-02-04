import React, { Component } from 'react';
import Board from './TicTacToeComponents/Board'
import GameState from './TicTacToeComponents/GameState'
import {assign, find, reject, each} from 'lodash'
import Modal from '@material-ui/core/Modal';
import io from 'socket.io-client';
import dotenv from 'dotenv'
import Typography from '@material-ui/core/Typography';
dotenv.config()

const socket = io({path:process.env.BACKEND_URL, reconnection: false, autoConnect: false})  ;


class TicTacToeContainer extends Component {
    //0 means nothing, 2 means white and 1 means black

    constructor(props) {
      super(props);
      this.state = {
        turn:1,
        playState:[
          [0,0,0],
          [0,0,0],
          [0,0,0],
        ],
        gameState:{finished: false, winning:0}// if empty then no one winning yet
      };

      this.evaluateGame = this.evaluateGame.bind(this)
      this.changeTurn = this.changeTurn.bind(this)
      this.evaluateInput = this.evaluateInput.bind(this)
      this.evaluateGame = this.evaluateGame.bind(this)
      this.reset = this.reset.bind(this)
    }



    evaluateInput(row, column){

      let { playState, turn , gameState} = {...this.state}
      let tempPlayState = [...playState]
      

      //put the symbol based on the turn number
      if(!gameState.finished){
        tempPlayState[row][column] = turn


        // update the box
        this.setState({
          playState: tempPlayState,

        })


        if(socket.connected)
          socket.emit('tick',tempPlayState)

        
        if(this.evaluateGame(tempPlayState, turn, row, column)){
          //evaluate game
          let gameOverState = assign(gameState,{finished:true, winning:turn})
          this.setState({
            gameState: gameOverState,

          })
          if(socket.connected)
            socket.emit('gameOver',gameOverState)

        }else{
          this.changeTurn()
        }
      }

    }



    evaluateGame(playState, turn, row, column){

      let finish = false

      // find other opponents element
      let columnWise = reject(playState[row], (value) => {return value === turn})

      if(columnWise.length === 0){
        finish = true
      }
      // evaluate row wise
      if(!finish){
        let rowWise = reject(playState, (row) => {return row[column] === turn})
        if(rowWise.length === 0){
          finish = true
        }
      }

      // evaluate left diagonal wise
      if(!finish){
        let leftDiagonal = playState.some((row , index, playState) =>{
          return row[index] !== turn
        })
        finish = !leftDiagonal
      }
      // evaluate right diagonal wise
      if(!finish){
        let rightDiagonal = playState.some((row , index, playState) =>{
          let lastIndex = playState.length - 1
          return row[lastIndex - index] !== turn
        })
        finish = !rightDiagonal
      }


      //evaluate the whole
      if(!finish){
        let zeroFound = 0

        each(playState, (row) =>{
          zeroFound = find(row, (value) =>{
            return value == 0
          })

          // to prevent misinterpretation
          if(zeroFound !== undefined)
            return false

        })

        if(zeroFound === undefined){
          finish = true

        }
      }

      return finish
    }

    changeTurn(){
      let {turn} = this.state
      if(turn == 1){
        this.setState({turn:2})
      }else{
        this.setState({turn:1})
      }
    }

    reset(){

      this.setState({
        turn:1,
        playState:[

                    [0,0,0],
                    [0,0,0],
                    [0,0,0],
                  ],
        gameState:{finished: false, winning:0}// if empty then no one winning yet
      })
    }

    render() {
      const {playState, gameState} = {...this.state}
      return (
        <div className="top-container">
          <Modal
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
             open={gameState.finished}

           >
            <GameState reset={() => {
                  if(socket.connected)
                    socket.emit('reset')
                  this.reset()
                }
              }
            />
          </Modal>

          <Board playState = {playState} onBoxClicked = {this.evaluateInput}/>
          <h1>
            YOUR TURN:
          </h1>
          <Typography variant="h1" component="h1" >
            {this.state.turn === 1?'X':'O' }
          </Typography>
          
        </div>
      );
    }
    componentDidMount(){
      if(socket.connected){
        socket.on('tick-on',(playState) => {
          this.setState({playState:playState})
        })
        socket.on('applyGameOver',(gameState) => {
          this.setState({ gameState:gameState})
        })
        socket.on('applyReset',() => {
          this.reset()
        })
      }
      
    }
  }

export default TicTacToeContainer
