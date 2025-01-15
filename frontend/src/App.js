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
      <header>
        <div id="logo">
          <img id="logo" src={require("./images/fairShareLogo.webp")} alt="FairShare Logo" />
        </div>
      </header>
      <div className="hero-div"><h1>{message}</h1>
        <button>Sign Up Now!</button>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;