import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { getMessage } from './api';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessage().then((data) => setMessage(data));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;