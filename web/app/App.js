import React from 'react';
import { connect } from 'react-redux';

import FullyConnectedResults from './components/FullyConnectedResults';
import InputCanvas from './components/InputCanvas';
import RescaledImage from './components/RescaledImage';

const AppComponent = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <InputCanvas/>
              <FullyConnectedResults/>
              <RescaledImage imageData={this.props.input_image.data} size={28}/>
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
