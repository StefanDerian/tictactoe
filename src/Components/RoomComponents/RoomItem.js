import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



function RoomItem(props){

 const {key, name, description, style} = {...props}

  return (
    <div key ={key} style={style}>
      <Paper elevation={5} style={style}>
        <Typography variant="h5" component="h3">
          {name}
        </Typography>
        <Typography component="p">
          {description}
        </Typography>
      </Paper>
    </div>
  )
}
export default RoomItem
