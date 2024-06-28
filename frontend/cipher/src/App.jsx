import React, { useState, useEffect } from 'react';
import './App.css';

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  return <div className="clock">{time}</div>;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/reverse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: inputText })
    })
      .then(response => response.json())
      .then(data => {
        setOutputText(data.reversed);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <h1>Welcome to Cipher-X</h1>
      <Clock />
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">Enter text</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          required
        />
        <button type="submit">Get your message</button>
      </form>
      <p>{outputText}</p>
    </div>
  );
}

export default App;
