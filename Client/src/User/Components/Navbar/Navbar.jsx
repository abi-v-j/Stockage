import { Box, Button, InputBase, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router';
import Styles from './Navbar.module.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={Styles.navbar}>

      {/* ===== Navigation Links ===== */}
      <div className={Styles.navLinks}>
        <li><Link to="/Userhome/dashboard">Home</Link></li>
        <li><Link to="/Userhome/about">About</Link></li>
        <li><Link to="/Userhome/blog">Blog</Link></li>
        <li><Link to="/Userhome/Viewcompany">Company</Link></li>
        <li><Link to="/Userhome/ViewMarkets">Markets</Link></li>
      </div>

      {/* ===== Search Bar ===== */}
      <div className={Styles.search}>
        <InputBase
          placeholder="Search Markets..."
          className={Styles.searchInput}
        />
      </div>

      {/* ===== Profile Section ===== */}
      <div className={Styles.profileSection}>
        <IconButton onClick={handleMenuOpen}>
          <Avatar
            src=""
            alt="profile"
            className={Styles.avatar}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/Userhome/MyProfile" onClick={handleMenuClose}>
            My Profile
          </MenuItem>

          <MenuItem component={Link} to="/Userhome/editprofile" onClick={handleMenuClose}>
            Edit Profile
          </MenuItem>

          <MenuItem component={Link} to="/Userhome/settings" onClick={handleMenuClose}>
            Settings
          </MenuItem>


          <MenuItem component={Link} to="/users/login" onClick={handleMenuClose}>
            Logout
          </MenuItem>
        </Menu>
      </div>

    </div>
  );
};

export default Navbar;
