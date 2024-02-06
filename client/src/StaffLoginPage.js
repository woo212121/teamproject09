import React, { useState } from 'react'
import './StaffLoginPage.css'

function StaffLoginPage() {

  return (
    <div className="staff-login-page">
      <div className="login-container">
        <h2 className="login-heading">Staff Login</h2>
        <form className="login-form">
          <label htmlFor="username" className="login-label">
            Staff ID
          </label>
          <input type="text" id="username" className="login-input" />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input type="password" id="password" className="login-input" />

          <button type="submit" className="login-button">
            
          </button>
        </form>
      </div>
    </div>
  )
}

export default StaffLoginPage