import React, {Component} from 'react';
import Square from './Square';

export default class Board extends Component {
  renderSquare(i){
    return <Square value={this.props.squares[i]}
    onClick={()=>this.props.onClick(i)}
    />
  }
  createBoard = ()=>{
    let size = 5
    let board = []
    for (let i=0; i<size; i++) {
      let rows = []
      for (let j=0; j<size; j++) {
        rows.push(this.renderSquare(size*i + j))
      }
      board.push(<div class="border-row">{rows}</div>)
    }
    return board
  }
  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    )
  }
}
