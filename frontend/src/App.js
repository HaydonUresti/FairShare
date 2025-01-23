import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
// import { getMessage } from './api';

import './styles/larger.css'

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js';
import Navbar from './components/Navbar.js';
function App() {
  // const [message, setMessage] = useState('');
  // const navigate = useNavigate()
  // useEffect(() => {
  //   getMessage().then((data) => setMessage(data));
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div id="logo-div">
            <img id="logo" src={require("./images/fairShareLogo.webp")} alt="FairShare Logo" />
          </div>
          <Navbar />
          <button
            id='logout-button'
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            Log Out</button>
          <button id='header-button'>Sign Up Now!</button>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;