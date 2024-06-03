'use client'

import React from 'react'
import '../../styles/live.css'
import Link from 'next/link'

const Header = ({ cta, link }) => {
  return (
    <header className="header">
      <h1 className="title">Fibr.</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item"><Link className="cta-btn" href={link}>{cta}</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header