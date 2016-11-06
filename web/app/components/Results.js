import React from 'react';

const barStyle = (width) => ({
  width: width + '%',
  display: "inline-block",
  verticalAlign: "middle",
  height: "1em",
  marginLeft: "0.7em"
});

const classificationValueStyle = {
  fontSize: "4em",
  fontWeight: "bold",
  textAlign: "center"
};

const classificationValueContainerStyle = {
  display: "inline-block",
  verticalAlign: "top",
  marginTop: "1.3em",
  marginLeft: "0.7em"
};

const keyStyle = {
  position: "absolute"
};


function maxClassification(classifications) {
  return Object.keys(classifications).reduce(function (currentMax, key) {
    if (classifications[key] > classifications[currentMax]) {
      return key;
    } else {
      return currentMax;
    }
  }, 0);
}

export const Results = React.createClass({

  render: function () {

    if (this.props.results == null) {
      return <div className="classification-results" style={{width: 306}}>
        <div style={{marginBottom: "1em"}}>
          <i className="fa fa-share-alt" aria-hidden="true"></i>
          <span style={{marginLeft: "0.5em"}}>{this.props.title}</span>
        </div>
      </div>;
    }

    const classificationValue = maxClassification(this.props.results);

    return <div className="classification-results">
      <div style={{marginBottom: "1em"}}>
        <i className="fa fa-share-alt" aria-hidden="true"></i>
        <span style={{marginLeft: "0.5em"}}>{this.props.title}</span>
      </div>
      <div className="classification-results-chart"
           style={{display: "inline-block"}}>{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
            const weight = parseInt(parseFloat(this.props.results[index.toString()]) * 100) || 0;
            return <div className="result-row" key={index}>
              <span style={keyStyle}>{index}</span>
                <div className="result" style={barStyle(weight)}/>
            </div>
        })}
      </div>
      <div style={classificationValueContainerStyle}>
        <span>Classification:</span>
        <div style={classificationValueStyle} className="classification-value">
          {classificationValue}
        </div>
      </div>
    </div>
	}
});


export default Results;
