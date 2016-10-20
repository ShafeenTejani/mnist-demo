import React from 'react';

import FullyConnectedResults from './components/FullyConnectedResults';
import InputCanvas from './components/InputCanvas';

module.exports = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <InputCanvas/>
              <FullyConnectedResults/>
            </div>)
  }
});
