import React from "react";

const connectorEndStyles = {
  height: "12px",
  width:  "12px",
  borderRadius: "50%",
  position: "relative",
  left: "-30%"
};

const ConnectorEnd = (props) => {
  const className = props.className || "";
  return <div className={className}
       style={{"height": props.height}}>
    {props.children}
    <div className="connector-end" style={connectorEndStyles}></div>
  </div>
};


export default ConnectorEnd;
