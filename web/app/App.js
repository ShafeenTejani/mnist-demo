import React from 'react';
import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';
import ConnectorHorizontal from './components/ConnectorHorizontal';
import ConnectorVertical from './components/ConnectorVertical';
import ConnectorEnd from './components/ConnectorEnd';
import Results from './components/Results';
import InputCanvas from './components/InputCanvas';
import RescaledImage from './components/RescaledImage';
import { evaluate } from './actions/EvaluateActions';

const AppComponent = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <div className="content">
                <Sidebar/>
                <main className="main-content">
                  <div className="input-row">
                    <InputCanvas onInputReady={() => this.props.evaluate(this.props.rescaled_input)}/>
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
                    <Results title="Fully Connected Neural Network" results={this.props.fully_connected}/>
                    <Results title="Convolutional Neural Network" results={this.props.convolutional}/>
                  </div>
                </main>
              </div>
            </div>)
  }
});


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { return {
  evaluate: function(input) { dispatch(evaluate(input)); }
}};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent);

export default App;
