
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"


import ProtectedRoute from './components/ProtectedRoute.js'
import Unauthorized from './pages/Unauthorized.js'

import './App.css'
import './styles/larger.css'
import './pages/EducatorDashboard/EducatorDashboard.css'

import Home from './pages/Home/Home.js'
import SignIn from './pages/SignIn.js'
import EducatorDashboard from './pages/EducatorDashboard/EducatorDashboard.js'
import GroupSelection from './pages/GroupSelection/GroupSelection.js'
import GroupWorkspace from './pages/GroupWorkspace/GroupWorkspace.js'

import Navbar from './components/Navigation/Navbar.js'
import LogoutButton from './components/logoutButton.js'

function App() {

  return (

    <BrowserRouter basename='/'>
      <div className="App">
        <header>
          <div id="logo-div">
            <img id="logo" src={require("./images/fairShareHorizontalLogo.webp")} alt="FairShare Logo" />
          </div>
          <Navbar />
          {/* <LogoutButton /> */}
        </header>
        <div className='main-wrapper'>
          <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes - Educators can access everything, Students are restricted */}
              {/* Educators only */}
              <Route element={<ProtectedRoute allowedRoles={['Educator']} />}>
                <Route path="/educator-dashboard" element={<EducatorDashboard />} />
              </Route>

              {/* Educators and Students */}
              <Route element={<ProtectedRoute allowedRoles={['Educator', 'Student']} />}>
                <Route path="/group-workspace" element={<GroupWorkspace />} />
                <Route path="/group-selection" element={<GroupSelection />} />
              </Route>
            </Routes>
          </main>
        </div>
        <footer>
          <div className='footer-links'>
            <div className="footer-nav">
              <ul>
                <li>
                  <Link to="/home"><strong>Home</strong></Link>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
                    <strong>About Us</strong>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
                    <strong>Help</strong>
                  </a>
                </li>
              </ul>
            </div>
            <div className='social-links'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" style={{ marginRight: "10px", color: "#4267B2" }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} size="2x" style={{ marginRight: "10px", color: "black" }} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: "red" }} />
              </a>
            </div>
          </div>
          <hr className='footer-hr'></hr>
          <div className='footer-bottom'>
            <p>© 2025 FairShare</p>
            <img id="footer-logo" src={require("./images/fairShareHorizontalLogo.webp")} height={45} alt="FairShare Logo" />
            <div className='footer-policy-div'>
              <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
              <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </div>
          </div>

        </footer>
      </div >
    </BrowserRouter >
  );
}

export default App;