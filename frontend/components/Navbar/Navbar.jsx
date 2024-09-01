import React from 'react'
import './Navbar.css'
import Logo from '../assets/CEA LOGO.png'
import { Link } from 'react-router-dom'
import power from '../assets/POWER.png'

const Navbar = ({ showLogout }) => {
  return (
    <div className='Navbar'>
      <img className='logo' src={Logo} alt="CEA Logo"/>
      <div className='rms'>
        <h1>CEA RMS</h1>
        <h3>Research Management System</h3>
      </div>
      {(
        showLogout && 
        <div className='logout'>
        <Link to="/" style={ {textDecoration: "none" , color: "#007B05", fontSize: 18, fontWeight: 600} }>LOGOUT</Link>
        <img src={power}/>
      </div>
      )}
    </div>
  )
}

export default Navbar
