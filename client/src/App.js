import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import StaffLoginPage from './StaffLoginPage'
import MenuPage from './MenuPage'
import './App.css'

function App() {
  const [showNav, setShowNav] = useState(false)

  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <div
          className="App-nav-wrapper"
          onMouseEnter={() => setShowNav(true)}
          onMouseLeave={() => setShowNav(false)}
        >
          <div className="App-nav-trigger" />
          <nav className={`App-nav ${showNav ? 'show' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About Us</Link>
          </nav>
        </div>

        {/* Main content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          {/* Other routes here */}
        </Routes>

        {/* Footer */}
        <footer className="App-footer">
          <p>The Exquisite Oaxaca</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
