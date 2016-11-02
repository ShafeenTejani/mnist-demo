import React from 'react';

import Sidebar from './components/Sidebar';
import DigitClassificationDemo from './components/DigitClassificationDemo';

const App = React.createClass({

  render: function () {
    return (<div className="app-wrapper">
              <div className="content">
                <Sidebar/>
                <DigitClassificationDemo/>
              </div>
            </div>)
  }
});

export default App;
