
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

import { logoutUser } from './services/userService.js'

import ProtectedRoute from './components/ProtectedRoute.js'
import Unauthorized from './pages/Unauthorized.js'

import './App.css';
import './styles/larger.css'

import Home from './pages/Home.js'
import SignIn from './pages/SignIn.js';
import EducatorDashboard from './pages/EducatorDashboard.js'
import GroupSelection from './pages/GroupSelection.js'

import Navbar from './components/Navbar.js';
import LogoutButton from './components/logoutButton.js'

function App() {

  return (
    <BrowserRouter basename='/'>
      <div className="App">
        <header>
          <div id="logo-div">
            <img id="logo" src={require("./images/fairShareLogo.webp")} alt="FairShare Logo" />
          </div>
          <Navbar />
          <LogoutButton />
          <button id='header-button'>Sign Up Now!</button>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes - Educators can access everything, Students are restricted */}
            {/* Educators only */}
            <Route element={<ProtectedRoute allowedRoles={['Educator']} />}>
              <Route path="/educator-dashboard" element={<EducatorDashboard />} />
            </Route>

            {/* Educators and Students */}
            <Route element={<ProtectedRoute allowedRoles={['Educator', 'Student']} />}>
              <Route path="/educator-dashboard" element={<EducatorDashboard />} />
              <Route path="/group-selection" element={<GroupSelection />} />
            </Route>
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;