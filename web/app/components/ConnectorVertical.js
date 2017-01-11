//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";

const ConnectorVertical = (props) => {
  const className = props.className || "";
  return <div className={className}
       style={{"height": props.height}}>
    <div style={{height: "100%"}} className="connector-vertical"/>
  </div>
};


export default ConnectorVertical;
