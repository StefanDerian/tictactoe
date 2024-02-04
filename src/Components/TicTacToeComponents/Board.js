
import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {Box as BoxStyle, Board as BoardStyle, Symbol} from '../../Style/Board'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 140
  },
});

function Board(props){
    let {playState, onBoxClicked} = { ...props }
    let divKey = 0;
    return (

        <div className="board">


            {playState.map((row,rowIndex) => {
              divKey += 1
              return(
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing = {8}
                  key = {divKey}
                >
                    {row.map((column,columnIndex) =>
                        <Grid item   lg ={'auto'} key = {rowIndex.toString()  + columnIndex.toString()}>
                              {column == 0 &&
                                <Paper onClick = {() => {onBoxClicked(rowIndex,columnIndex)}} style ={BoxStyle}>
                                  <Typography variant="h5" component="h3" style ={Symbol}>
          
                                  </Typography>
                                </Paper>
                              }
                              {column == 1 &&
                                <Paper  style ={BoxStyle}>
                                   <Typography variant="h5" component="h3" style ={Symbol}>
                                    X
                                  </Typography>
                                </Paper>
                              }
                              {column == 2 &&
                                <Paper  style ={BoxStyle}>
                                 <Typography variant="h5" component="h3"  style ={Symbol}>
                                  O
                                 </Typography>
                                </Paper>
                              }
                        </Grid>

                    )}


              </Grid>

              )


            })}

          </div>


  );
}
export default withStyles(styles)(Board)
