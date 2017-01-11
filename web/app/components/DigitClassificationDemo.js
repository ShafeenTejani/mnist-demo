//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";
import { connect } from 'react-redux';

import ConnectorHorizontal from './ConnectorHorizontal';
import ConnectorVertical from './ConnectorVertical';
import ConnectorEnd from './ConnectorEnd';
import Results from './Results';
import InputCanvas from './InputCanvas';
import RescaledImage from './RescaledImage';
import { evaluate } from '../actions/EvaluateActions';
import { inputUpdated, inputCleared, inputReady } from '../actions/InputActions';

const DigitClassificationDemoComponent = React.createClass({
  render: function() {
    return <main className="main-content">
      <div className="input-row">
        <InputCanvas onInputReady={() => this.props.evaluate(this.props.rescaled_input)}
                     onInputUpdated={this.props.onInputUpdated}
                     onInputCleared={this.props.onInputCleared}/>

        <ConnectorHorizontal width={300} className="input-to-rescaled-connector"/>
        <div className="rescaled-column">
          <div className="rescaled-title">
            Neural Network Input (28 x 28 pixels)
          </div>
          <RescaledImage imageData={this.props.rescaled_input} size={28}/>
          <ConnectorVertical height={250} className="input-output-connector"/>
        </div>
      </div>
      <ConnectorHorizontal width={427} className="output-connector"/>
      <div>
        <ConnectorEnd className="output-connector-end">
          <ConnectorVertical height={15}/>
        </ConnectorEnd>
        <ConnectorEnd className="output-connector-end">
          <ConnectorVertical height={15}/>
        </ConnectorEnd>
      </div>
      <div className="output-row">
        <Results title="Convolutional Neural Network" results={this.props.convolutional}/>
        <Results title="Fully Connected Neural Network" results={this.props.fully_connected}/>
      </div>
      <div className="github-link"><a href="https://github.com/ShafeenTejani/mnist-demo" target="_blank">See the code on GitHub</a></div>
    </main>;
  }
});

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { return {
  evaluate: function(input) { dispatch(evaluate(input)); },
  onInputUpdated: function(imageData, size) { dispatch(inputUpdated(imageData, size)); },
  onInputCleared: function() { dispatch(inputCleared()); }
}};

const DigitClassificationDemo = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DigitClassificationDemoComponent);

export default DigitClassificationDemo;
