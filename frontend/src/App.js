
import { BrowserRouter, Routes, Route } from 'react-router-dom'


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

import Navbar from './components/Navbar.js'
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
        <footer><p>This is the footer</p></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;