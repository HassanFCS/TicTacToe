const reactDom = require("react-dom");

import React, {Component} from 'react'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cIsNext: true,
      stepNumber: 0,
      history: [
        { squares: Array(9).fill(null) }
      ]
    }
  }
  render() {
    retrun (
      <div>
        
      </div>
    )
  }
}
