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
    const pixelIntensities = this.props.imageData;

    const toSize = this.props.size;
    const fromSize = parseInt(Math.sqrt(pixelIntensities.length));
    const scale = fromSize / toSize;

    const rescaledPixelIntensities = Array(toSize**2);

    for (let i=0; i < rescaledPixelIntensities.length; i++) {
      let xStart = (i%toSize)*scale;
      let xEnd = xStart + scale;
      let yStart = parseInt(i/toSize) * scale;
      let yEnd = yStart + scale;

      let pixelSum = 0;
      for (let x=xStart; x < xEnd; x++) {
        for (let y=yStart; y < yEnd; y++) {
          pixelSum += pixelIntensities[x + y*fromSize]
        }
      }
      rescaledPixelIntensities[i] = pixelSum / (scale**2);
    }

    for (let i=0; i < rescaledPixelIntensities.length; i++) {
      this.ctx.fillStyle = "rgba(0,0,0,"+(rescaledPixelIntensities[i]/255)+")";
      let x = i % toSize;
      let y = i / toSize;
      this.ctx.fillRect( x, y, 1, 1 );
    }
  },

  render: function() {
    return <div className="rescaled-canvas-container">
            <canvas className="rescaled-canvas"
                    ref="rescaledCanvas"
                    width={28} height={28}
                    />
          </div>
  }
});

export default RescaledImage;
