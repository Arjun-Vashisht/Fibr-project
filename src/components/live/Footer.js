'use client'

import React from 'react'
import '../../styles/live.css'
import '../../app/(root)/globals.css'


const Footer = ({ insta, twitter, madeBy }) => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href={insta}><i className="fab fa-instagram"></i></a>
        <a href={twitter}><i className="fab fa-twitter"></i></a>
      </div>
      <div className="made-by">
        <p>Made By: {madeBy}</p>
      </div>
  </footer>
  )
}

export default Footer