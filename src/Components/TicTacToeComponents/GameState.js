
import React from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Card as CardStyle, CardAction} from '../../Style/GameState'


export default function GameState(props){

  let {reset} = {...props}

  return(
    <div style = {CardStyle}>

      <Card >
        <CardContent>
          <Typography variant="h5" component="h3">
            Game Over!
          </Typography>


        </CardContent>
        <CardActions style={CardAction}>
          <Button variant="contained" color="primary" onClick = {() => {reset()}}>Reset Game</Button>
          <Button variant="contained" color="secondary" >Quit</Button>
        </CardActions>
      </Card>
    </div>
  )




}
