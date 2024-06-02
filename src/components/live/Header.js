'use client'

import React from 'react'
import '../../styles/live.css'

const Header = ({ cta, link }) => {
  return (
    <header className="header">
      <h1 className="title">Fibr.</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item"><a className="cta-btn" href={link}>{cta}</a></li>
          {/* Add other navigation items here */}
        </ul>
      </nav>
    </header>
  )
}

export default Header