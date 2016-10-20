import React from "react";
import { findDOMNode } from 'react-dom';

class InputCanvas extends React.Component {

  componentDidMount() {
    this.canvas = findDOMNode(this.refs.inputCanvas);
    this.ctx = this.canvas.getContext('2d');
  }

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.clear = this.clear.bind(this);
    this.state = {
      currentPosition: null,
      drawing: false
    };
  }

  onMouseDown(e) {
    this.setState({drawing: true});
    this.setState({currentPosition: this.getCursorPosition(e)});
  }

  onMouseMove(e) {
    if (!this.state.drawing) return;

    const previousPosition = this.state.currentPosition;
    const currentPosition = this.getCursorPosition(e);

    this.drawLine(previousPosition, currentPosition);

    this.setState({currentPosition: currentPosition});
  }

  onMouseUp(e) {
    this.setState({drawing: false});
  }

  drawLine(start, end) {
    this.ctx.save();
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.lineWidth = 8;
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - left,
      y: e.clientY - top
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  render() {
    return <div className="input-canvas-container">
            <canvas className="input-canvas"
                    ref="inputCanvas"
                    width={300} height={400}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseUp}
                    onMouseUp={this.onMouseUp}
                    />
              <button className="clear-canvas pure-button" onClick={this.clear}>Clear</button>
          </div>
  }
};

export default InputCanvas;
