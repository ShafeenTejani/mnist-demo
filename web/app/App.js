import React from 'react';
import { connect } from 'react-redux';

import Results from './components/Results';
import InputCanvas from './components/InputCanvas';
import RescaledImage from './components/RescaledImage';
import { evaluate } from './actions/EvaluateActions';

const AppComponent = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <InputCanvas onInputReady={() => this.props.evaluate(this.props.rescaled_input)}/>
              <RescaledImage imageData={this.props.rescaled_input} size={28}/>
              <Results results={this.props.convolutional}/>
              <Results results={this.props.fully_connected}/>
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
