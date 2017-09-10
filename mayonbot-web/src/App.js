import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Custom from './Custom';

import './App.css';

const steps = [
  {
    id: '1',
    message: 'Please enter the GitHub username',
    trigger: 'username',
  },
  {
    id: 'username',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    component: <Custom />,
    waitAction: true,
    trigger: '1'
  },
];

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
          <ChatBot headerTitle="GitHubBot" steps={steps} />
        </div>
      </div>
    );
  }
}

export default App;
