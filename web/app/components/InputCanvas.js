import React from "react";
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { inputUpdated } from '../actions/InputActions';
import { inputCleared } from '../actions/InputActions';


function toPixelIntensities(imageData) {
  const pixelIntensities = Array(imageData.length / 4); //RGBA

  for (let i=0; i < imageData.length; i=i+4) {
    pixelIntensities[i/4] = imageData[i+3];
  }
  return pixelIntensities
}

class InputCanvasComponent extends React.Component {

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

    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    this.props.inputUpdated(toPixelIntensities(imageData), 224);

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
    this.props.inputCleared();
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
          </div>
  }
};

const mapStateToProps = (state) => {
  return { input_image: state.input_image };
};

const mapDispatchToProps = (dispatch) => { return {
    inputUpdated: function(imageData, size) { dispatch(inputUpdated(imageData, size)); },
    inputCleared: function() { dispatch(inputCleared()); }
  };
};


const InputCanvas = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputCanvasComponent);


export default InputCanvas;
