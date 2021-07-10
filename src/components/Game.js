import { getSuggestedQuery } from '@testing-library/react';
import React, {Component} from 'react'
import Board from './Board'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      size: 5,
      history: [
        { squares: Array(9).fill(null) }
      ]
    }
  }
  squareSize = ()=> {
    let s = this.state.size
    return s*s
  }
  resetGame() {
    this.setState({
      xIsNext: true,
      stepNumber: 0,
      history: [
        { squares: Array(this.squareSize()).fill(null) }
      ]
    })
  }

  handleClick(i) {
    const size = this.state.size
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    const winner = decideWinner(squares, size);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squares
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  render() {
    const size = this.state.size
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = decideWinner(current.squares, size);
    const restartBtn = ()=>{
      return(
          <div class='restart-btn' onClick={()=>{this.resetGame()}}>
            Restart
          </div>
      )
    }
    let status;
    if(history.length === 1) {
      status = 'Start the game'
    }
    else{
      if(winner) {
        status = 'Winner is ' + winner
      }
      else if (history.length > this.squareSize()) {
        status = 'Game is Tied'
      }
      else {
        status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
      }
    }

    return (
      <div class='game-wrapper'>
        <div class="game-info">
          <div class='info-wrapper'>{status}</div>
          <div class='btn-wrapper'>{restartBtn()}</div>
        </div>
        <div className="game">
          <div className="game-board">
            <Board onClick = {(i)=>this.handleClick(i)}
            squares={current.squares}
            />
          </div>
        </div>
      </div>
    )
  }
}

function winningPositions(){
  let size = 5
  let positions = []
  //row wise winning posititons
  for(let i=0;i<size; i++){
    let row = []
    for(let j=0;j<size; j++){
      row.push(i*size+j)
    }
    positions.push(row)
  }
  //col wise winning positions
  for(let i=0;i<size; i++){
    let col = []
    for(let j=0;j<size; j++){
      col.push(j*size+i)
    }
    positions.push(col)
  }
  //left diagonal winning positions
  let ldig = []
  for(let i=0;i<size; i++){
    ldig.push(i*size+i)
  }
  positions.push(ldig)
  //right diagonal winning positions
  let rdig = []
  for(let i=0; i<size; i++){
    rdig.push(i*size+(size-1-i))
  }
  positions.push(rdig)
  return  positions
}

function decideWinner(squares, size) {
  const lines = winningPositions()

  for(let i=0; i<lines.length; i++) {
    if(size == 3){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
        return squares[a]
    }
    else if(size == 4){
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d])
        return squares[a]
    }
    else if(size == 5){
      const [a, b, c, d, e] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d] && squares[d] === squares[e])
        return squares[a]
    }
  }
  return null;
}
