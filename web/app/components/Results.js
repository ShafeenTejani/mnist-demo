import React from 'react';

const barStyle = (height) => ({
  height: height + '%'
});


export const Results = React.createClass({

  render: function () {
    return <div>
      <ul className="chart">{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const weight = parseInt(parseFloat(this.props.results[index.toString()]) * 100) || 0;
            return <li key={index}>
              <div style={barStyle(weight)} title={index}></div>
            </li>
        })}
      </ul>
    </div>
	}
});


module.exports = Results;
