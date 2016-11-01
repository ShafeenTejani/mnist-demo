import React from "react";

const ConnectorVertical = (props) => {
  const className = props.className || "";
  return <div className={className}
       style={{"height": props.height}}>
    <div style={{height: "100%"}} className="connector-vertical"/>
  </div>
};


export default ConnectorVertical;
