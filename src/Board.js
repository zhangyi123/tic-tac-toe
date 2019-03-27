import React, { Component } from 'react';
import Square from './Square.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player : 'Player: X',
      grid : Array(9).fill(null),
      hasWinner: false,
    };
  }
  checkWinner() {
    let grid = this.state.grid.slice()
    if( (grid[0]!=null && grid[0] == grid[1] && grid[1] == grid[2]) || //rows
        (grid[3]!=null && grid[3] == grid[4] && grid[4] == grid[5]) ||
        (grid[6]!=null && grid[6] == grid[7] && grid[7] == grid[8]) ||
        (grid[0]!=null && grid[0] == grid[3] && grid[3] == grid[6]) || //columns
        (grid[1]!=null && grid[1] == grid[4] && grid[4] == grid[7]) ||
        (grid[2]!=null && grid[2] == grid[5] && grid[5] == grid[8]) ||
        (grid[0]!=null && grid[0] == grid[4] && grid[4] == grid[8]) || //diagonal
        (grid[2]!=null && grid[2] == grid[4] && grid[4] == grid[6])
    )
      this.setState({hasWinner: true})
    else{
      let playerNxtTurn = (this.state.player === 'Player: X') ? 'Player: O' : 'Player: X'
      this.setState({player : playerNxtTurn})
    }
  }
  renderSquare(i) {
    let status
    if(this.state.grid[i] == null) status = ''
    else if(this.state.grid[i] == 'X') status = 'X'
    else status = 'O'
    return <Square stat = {status} click = {() => this.handleClick(i)} />
  }
  renderGrid() {
    return (
      <div>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        <br/>
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        <br/>
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
        <br/>
      </div>
    )
  }
  //Button handlers
  handleStart() {
    const newGrid = Array(9).fill(null)
    this.setState({
      grid: newGrid,
      player: 'Player: X',
      hasWinner: false,
    })
  }
  handleClick(i) {
    let player = this.state.player
    if(this.state.hasWinner == false && this.state.grid[i] == null){
        let newGrid = this.state.grid.slice()
        if(player == 'Player: X') newGrid[i] = 'X'
        else                    newGrid[i] = 'O'
        //callback makes sure call checkWinner after setState finishes
        this.setState({grid : newGrid}, () => this.checkWinner())
    }
  }
  handleEnd() {
    if(this.state.hasWinner == false){
      let playerNxtTurn = (this.state.player === 'Player: X') ? 'Player: O' : 'Player: X'
      this.setState({
        player : playerNxtTurn,
        hasWinner: true
      })
    }
  }
  render() {
    let message
    if(this.state.hasWinner == true) message = this.state.player
                                               + ' is the winner! click start to play again'
    else message = this.state.player + '\'s turn'
    return (
      <div>
        <h1>{message}</h1>
        {this.renderGrid()}
        <button onClick = {() => this.handleStart()}>Start</button>
        <button onClick = {() => this.handleEnd()}>Give Up</button>
      </div>
    );
  }
}

export default Board;
