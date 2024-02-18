import { useState } from 'react';

import './styles/index.css';
import './styles/reset.css';

import { makeRequest } from './api/api';
import ChatMessage from './components/ChatMessage/index';
import SideMenu from './components/SideMenu/index';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      user: 'gpt',
      message: 'Como posso te ajudar hoje?',
    },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();

    let response = await makeRequest({ prompt: input });

    response = response.split('\n').map((line) => <p>{line}</p>);

    setChatLog([
      ...chatLog,
      {
        user: 'me',
        message: `${input}`,
      },
      {
        user: 'gpt',
        message: response,
      },
    ]);
    setInput('');
  }

  return (
    <div className="App">
      <SideMenu></SideMenu>

      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              className="chat-input-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
