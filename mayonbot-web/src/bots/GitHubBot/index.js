import React from 'react';
import ChatBot from 'react-simple-chatbot';
import GitHubBotResponder from './GitHubBotResponder';

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
    component: <GitHubBotResponder />,
    waitAction: true,
    trigger: '1'
  },
];

const GitHubBot = () => (
  <ChatBot headerTitle="GitHub Bot" steps={steps} />
);

export default GitHubBot;
