import React from 'react'
import Styles from "./Navbar.module.css";
import { Link } from 'react-router';
import { Button } from '@mui/material';

const Navbar = () => {
  return (
    <div className={Styles.navbar}>

      {/* Logo */}
      <div className={Styles.logo}>
        STOCK
      </div>

      {/* Links */}
      <ul className={Styles.navLinks}>
        <li><Link to="/Dashboard">Home</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Blog">Blog</Link></li>
        <li><Link to="/Sectors">Sectors</Link></li>
      </ul>

      {/* Right Buttons */}
      <div className={Styles.sections}>
        <Link to="/Login" className={Styles.loginBtn}>Login</Link>
        <Link to="/Guest/SignUp" className={Styles.signupBtn}>Sign Up</Link>
      </div>

    </div>
  )
}

export default Navbar
