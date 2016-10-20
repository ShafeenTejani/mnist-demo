import React from 'react';
import { connect } from 'react-redux';
import { evaluateFullyConnected } from '../actions/EvaluateActions';

export const FullyConnectedResults = React.createClass({

  componentDidMount: function() {
    this.props.evaluateFullyConnected();
  },

  render: function () {
    return <div>{
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
        return <div key={index}>
          <span>Classification {index}:</span>
          <span>  {parseFloat(this.props.fully_connected[index.toString()]).toFixed(5)}</span>
        </div>;
      })
    }</div>
	}
});

const mapStateToProps = (state) => {
  return { fully_connected: state.fully_connected };
};

const mapDispatchToProps = (dispatch) => { return {
    evaluateFullyConnected: function() { dispatch(evaluateFullyConnected()); },
    addMenuItem: function() { dispatch(addMenuItem()); }
  };
};


module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
  )(FullyConnectedResults);
