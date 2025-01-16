import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
// import { getMessage } from './api';

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js';

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   getMessage().then((data) => setMessage(data));
  // }, []);

  return (
    <div className="App">
      <header>
        <div id="logo">
          <img id="logo" src={require("./images/fairShareLogo.webp")} alt="FairShare Logo" />
        </div>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />

          </Routes>
        </BrowserRouter>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;