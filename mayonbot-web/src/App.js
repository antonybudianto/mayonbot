import React, { Component } from 'react';
import GitHubBot from './bots/GitHubBot';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>MayonBot</h2>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px'
        }}>
          <GitHubBot/>
        </div>
      </div>
    );
  }
}

export default App;
