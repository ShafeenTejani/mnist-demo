import React from 'react';
import { connect } from 'react-redux';

import { evaluateConvolutional, evaluateFullyConnected } from '../actions/EvaluateActions';

export const EvaluateResults = React.createClass({

  componentDidMount: function() {

  },

  evaluate: function(){
    if (this.props.rescaled_input) {
        const input = this.props.rescaled_input.map(x => x / 255.0);
        this.props.evaluateConvolutional(input);
        this.props.evaluateFullyConnected(input);
    }
  },

  render: function () {
    return  <button className='pure-button pure-button-primary' onClick={this.evaluate}>Evaluate</button>;
	}
});

const mapStateToProps = (state) => {
  return {
    rescaled_input: state.rescaled_input
    };
};

const mapDispatchToProps = (dispatch) => { return {
    evaluateConvolutional: function(input) { dispatch(evaluateConvolutional(input)); },
    evaluateFullyConnected: function(input) { dispatch(evaluateFullyConnected(input)); }
  };
};


module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EvaluateResults);
