import { getSuggestedQuery } from '@testing-library/react';
import React, {Component} from 'react'
import Board from './Board'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [
        { squares: Array(9).fill(null) }
      ]
    }
  }
  resetGame() {
    this.setState({
      xIsNext: true,
      stepNumber: 0,
      history: [
        { squares: Array(9).fill(null) }
      ]
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    const winner = decideWinner(squares);
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
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = decideWinner(current.squares);
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
      else if (history.length > 9) {
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

function decideWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for(let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
      return squares[a]
  }
  return null;
}
