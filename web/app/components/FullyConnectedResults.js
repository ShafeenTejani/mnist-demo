import React from 'react';
import { connect } from 'react-redux';

import { evaluateFullyConnected } from '../actions/EvaluateActions';

export const FullyConnectedResults = React.createClass({

  componentDidMount: function() {

  },

  evaluate: function(){
    if (this.props.rescaled_input) {
        console.log(this.props.rescaled_input);
        this.props.evaluateFullyConnected(this.props.rescaled_input.map(x => x/255.0));
    }
  },

  render: function () {
    return <div>
      <button className='pure-button pure-button-primary' onClick={this.evaluate}>Evaluate</button>
      <div>{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
          return <div key={index}>
            <span>Classification {index}:</span>
            <span>  {parseFloat(this.props.fully_connected[index.toString()]).toFixed(5)}</span>
          </div>;
        })
      }</div>
    </div>
	}
});

const mapStateToProps = (state) => {
  return { fully_connected: state.fully_connected,
    rescaled_input: state.rescaled_input
    };
};

const mapDispatchToProps = (dispatch) => { return {
    evaluateFullyConnected: function(input) { dispatch(evaluateFullyConnected(input)); },
    addMenuItem: function() { dispatch(addMenuItem()); }
  };
};


module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
  )(FullyConnectedResults);
