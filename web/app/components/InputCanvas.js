import React from "react";
import { findDOMNode } from 'react-dom';

class InputCanvas extends React.Component {

  componentDidMount() {
    this.canvas = findDOMNode(this.refs.inputCanvas);
    this.ctx = this.canvas.getContext('2d');

    this.rescaledCanvas = findDOMNode(this.refs.rescaledCanvas);
    this.rescaledCtx = this.rescaledCanvas.getContext('2d');
  }

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.clear = this.clear.bind(this);
    this.inputDrawn = this.inputDrawn.bind(this);
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
    this.inputDrawn();

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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.rescaledCtx.clearRect(0, 0, this.rescaledCanvas.width, this.rescaledCanvas.height);
  }

  inputDrawn() {
    this.rescaledCtx.clearRect(0, 0, this.rescaledCanvas.width, this.rescaledCanvas.height);
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

    const pixelIntensities = Array(imageData.length / 4); //RGBA

    for (let i=0; i < imageData.length; i=i+4) {
      pixelIntensities[i/4] = imageData[i+3];
    }

    const rescaled = Array(28**2);

    for (let i=0; i < rescaled.length; i++) {
      let xStart = (i%28)*8;
      let xEnd = xStart + 8;
      let yStart = parseInt(i/28) * 8;
      let yEnd = yStart + 8;

      let pixelSum = 0;
      for (let x=xStart; x < xEnd; x++) {
        for (let y=yStart; y < yEnd; y++) {
          pixelSum += pixelIntensities[x + y*224]
        }
      }

      rescaled[i] = pixelSum / 64.0;
    }

    for (let i=0; i < rescaled.length; i++) {
      this.rescaledCtx.fillStyle = "rgba(0,0,0,"+(rescaled[i]/255)+")";
      let x = i % 28;
      let y = i / 28;
      this.rescaledCtx.fillRect( x, y, 1, 1 );
    }
  }

  render() {
    return <div className="input-canvas-container">
            <canvas className="input-canvas"
                    ref="inputCanvas"
                    width={224} height={224}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseUp}
                    onMouseUp={this.onMouseUp}
                    />
              <button className="clear-canvas pure-button" onClick={this.clear}>Clear</button>
              <canvas className="rescaled-canvas"
                      ref="rescaledCanvas"
                      width={28} height={28}/>
          </div>
  }
};

export default InputCanvas;
