import React from 'react';
import { connect } from 'react-redux';

import Results from './components/Results';
import EvaluateResults from './components/EvaluateResults';
import InputCanvas from './components/InputCanvas';
import RescaledImage from './components/RescaledImage';

const AppComponent = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <InputCanvas/>
              <EvaluateResults/>
              <Results results={this.props.convolutional}/>
              <Results results={this.props.fully_connected}/>
              <RescaledImage imageData={this.props.rescaled_input} size={28}/>
            </div>)
  }
});


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => { return {}};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppComponent);

export default App;
