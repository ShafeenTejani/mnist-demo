import React from 'react';
import { connect } from 'react-redux';

import { evaluate } from '../actions/EvaluateActions';

export const EvaluateResults = React.createClass({

  componentDidMount: function() {

  },

  evaluate: function(){
    if (this.props.rescaled_input) {
        const input = this.props.rescaled_input;
        this.props.evaluate(input);
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
    evaluate: function(input) { dispatch(evalutate(input)); }
  };
};


module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
  )(EvaluateResults);
