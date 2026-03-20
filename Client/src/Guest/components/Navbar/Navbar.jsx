import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Styles from "./Navbar.module.css";

const tickers = [
  { sym: "RELIANCE", val: "2,941.50", chg: "+1.2%", up: true },
  { sym: "TCS", val: "3,852.00", chg: "+0.8%", up: true },
  { sym: "HDFCBANK", val: "1,620.45", chg: "-0.3%", up: false },
  { sym: "INFY", val: "1,445.80", chg: "+1.5%", up: true },
  { sym: "WIPRO", val: "462.35", chg: "-0.6%", up: false },
  { sym: "AAPL", val: "$172.45", chg: "+0.4%", up: true },
  { sym: "TSLA", val: "$248.10", chg: "-1.1%", up: false },
];

const navLinks = [
  {
    to: "/",
    label: "Dashboard",
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
    to: "/Login",
    label: "Login",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 11l4-3-4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/Signup",
    label: "Signup",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.8 13c.5-2.1 2.3-3.5 4.2-3.5S9.7 10.9 10.2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.5 4.5v4M10.5 6.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/Companyreg",
    label: "Company Reg",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={Styles.navbarWrapper}>
      {/* Ticker */}
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

      {/* Navbar */}
      <nav className={Styles.navbar}>
        {/* Logo */}
        <Link to="/" className={Styles.logo}>
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

        {/* Only Guest Links */}
        <ul className={Styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${Styles.navLink} ${location.pathname === link.to ? Styles.active : ""}`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div className={Styles.searchWrap}>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14" className={Styles.searchIcon}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className={Styles.searchInput}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Right Side */}
        <div className={Styles.navRight}>
          <div className={Styles.menuWrap} ref={menuRef}>
            <button
              type="button"
              className={Styles.watchlistBtn}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              Menu
            </button>

            {menuOpen && (
              <div className={Styles.dropdown}>
                {navLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={Styles.dropdownItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;