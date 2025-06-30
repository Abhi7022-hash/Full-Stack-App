import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('/api/message').then(res => setMessage(res.data.message));
  }, []);

  const handleSubmit = () => {
    axios.post('/api/message', { message: input }).then(res => {
      setMessage(res.data.message);
      setInput('');
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Message: {message}</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default App;
