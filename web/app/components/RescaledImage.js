import React from "react";
import { findDOMNode } from 'react-dom';

const RescaledImage = React.createClass({

  componentDidMount: function() {
    this.canvas = findDOMNode(this.refs.rescaledCanvas);
    this.ctx = this.canvas.getContext('2d');
  },

  componentDidUpdate: function() {
    this.clear();
    if (this.props.imageData && this.props.imageData.length > 0) {
      this.drawImage();
    }
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  drawImage: function() {
    for (let i=0; i < this.props.imageData.length; i++) {
      this.ctx.fillStyle = "rgba(0,0,0,"+(this.props.imageData[i])+")";
      let x = i % this.props.size;
      let y = i / this.props.size;
      this.ctx.fillRect( x, y, 1, 1 );
    }
  },

  render: function() {
    return <div className="rescaled-canvas-container">
            <canvas className="rescaled-canvas"
                    ref="rescaledCanvas"
                    width={this.props.size} height={this.props.size}
                    />
          </div>
  }
});

export default RescaledImage;
