import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Avatar, Menu, MenuItem, IconButton, InputBase } from "@mui/material";
import Styles from "./Navbar.module.css";

const tickers = [
  { sym: "RELIANCE", val: "2,941.50", chg: "+1.2%", up: true },
  { sym: "TCS", val: "3,852.00", chg: "+0.8%", up: true },
  { sym: "HDFCBANK", val: "1,620.45", chg: "-0.3%", up: false },
  { sym: "INFY", val: "1,445.80", chg: "+1.5%", up: true },
  { sym: "WIPRO", val: "462.35", chg: "-0.6%", up: false },
  { sym: "AAPL", val: "$172.45", chg: "+0.4%", up: true },
  { sym: "TSLA", val: "$248.10", chg: "-1.1%", up: false },
  { sym: "MSFT", val: "$415.30", chg: "+0.9%", up: true },
];

const navLinks = [
  {
    to: "/user/Dashboard",
    label: "Home",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: "/user/Viewcompany",
    label: "Company",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    to: "/user/ViewMarkets",
    label: "Markets",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <polyline
          points="1,12 5,6 9,9 14,3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="11,3 14,3 14,6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    handleMenuClose();
    navigate("/");
  };

  const getInitials = () => {
    const name = sessionStorage.getItem("uname") || "JD";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const userName = sessionStorage.getItem("uname") || "John Doe";
  const email = sessionStorage.getItem("uemail") || "Investor";

  return (
    <div className={Styles.navbarWrapper}>
      {/* Ticker Tape */}
      <div className={Styles.tickerTape}>
        <div className={Styles.tickerInner}>
          {[...tickers, ...tickers].map((t, i) => (
            <div className={Styles.tickerItem} key={i}>
              <span className={Styles.tickerSym}>{t.sym}</span>
              <span className={Styles.tickerVal}>{t.val}</span>
              <span className={t.up ? Styles.tickerUp : Styles.tickerDown}>{t.chg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={Styles.navbar}>
        {/* Logo */}
        <Link to="/user/Dashboard" className={Styles.logo}>
          <div className={Styles.logoIcon}>
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
              <polyline
                points="2,13 6,7 10,10 15,4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={Styles.logoText}>
            Ticker<span className={Styles.logoAccent}>Pro</span>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className={Styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${Styles.navLink} ${
                  location.pathname === link.to ? Styles.active : ""
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className={Styles.searchWrap} ref={searchRef}>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" className={Styles.searchIcon}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <InputBase
            placeholder="Search Markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={Styles.searchInput}
          />
        </div>

        {/* Right Side */}
        <div className={Styles.navRight}>
          {/* Notification */}
          <div className={Styles.notifBtn}>
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
              <path
                d="M8 2a5 5 0 015 5v2l1 2H2l1-2V7a5 5 0 015-5z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M6.5 13a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className={Styles.notifDot} />
          </div>

          {/* Quick Button */}
          <Link to="/Userhome/ViewMarkets" className={Styles.watchlistBtn}>
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
              <path
                d="M8 2l1.5 4h4l-3.3 2.4 1.3 4L8 10 4.5 12.4l1.3-4L2.5 6h4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Watchlist
          </Link>

          <div className={Styles.divider} />

          {/* Profile */}
          <div className={Styles.profileWrap} onClick={handleMenuOpen}>
            <IconButton sx={{ p: 0 }}>
              <Avatar className={Styles.avatar}>{getInitials()}</Avatar>
            </IconButton>

            <div className={Styles.profileInfo}>
              <div className={Styles.profileName}>{userName}</div>
              <div className={Styles.profileSub}>{email}</div>
            </div>

            <div className={`${Styles.chevron} ${open ? Styles.chevronOpen : ""}`}>
              <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              className: Styles.muiMenuPaper,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              component={Link}
              to="/user/MyProfile"
              onClick={handleMenuClose}
              className={Styles.muiMenuItem}
            >
              My Profile
            </MenuItem>

            <MenuItem
              component={Link}
              to="/user/Editprofile"
              onClick={handleMenuClose}
              className={Styles.muiMenuItem}
            >
              Edit Profile
            </MenuItem>

            <MenuItem
              component={Link}
              to="/user/settings"
              onClick={handleMenuClose}
              className={Styles.muiMenuItem}
            >
              Settings
            </MenuItem>

            <MenuItem
              component={Link}
              to="/user/ChangePassword"
              onClick={handleMenuClose}
              className={Styles.muiMenuItem}
            >
              Change Password
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              className={`${Styles.muiMenuItem} ${Styles.muiDanger}`}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;