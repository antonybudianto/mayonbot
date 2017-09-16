import React, { Component } from 'react';
import GitHubBot from './bots/GitHubBot';

import './App.css';

class App extends Component {
  state = {
    currentBot: GitHubBot
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>MayonBot</h4>
        </div>
        <div className="container" style={{paddingTop: '20px'}}>
          <div className="row">
            <div className="col-md-4 mr-auto">
              <div className="list-group">
                <a href="#githubBot" className="list-group-item active">
                  GitHub Bot
                </a>
                <a href="#comingSoon" className="list-group-item list-group-item-action disabled">more coming soon</a>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px'
              }}>
                {this.state.currentBot && <this.state.currentBot />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
