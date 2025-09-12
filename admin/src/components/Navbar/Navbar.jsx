import React from 'react'
import './navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className='nav-logo'></img>
      <img src={navProfile} alt="" className='nav-logo'></img>
    </div>
  )
}

export default Navbar
