//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";

const ConnectorHorizontal = (props) => {
  const className = props.className || "";
  return <div className={className}
       style={{"width": props.width}}>
    <div className="connector-horizontal"/>
  </div>
};


export default ConnectorHorizontal;
