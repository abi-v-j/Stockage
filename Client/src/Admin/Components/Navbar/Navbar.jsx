import React, { useState, useEffect } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Tooltip,
  Divider,
  ListItemIcon,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CloseIcon from "@mui/icons-material/Close";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { motion, AnimatePresence } from "framer-motion";
import Styles from "./Navbar.module.css";

const notifications = [
  { id: 1, text: "AAPL crossed ₹182 target",     time: "2m ago",  dot: "#00e5a0", icon: "↑" },
  { id: 2, text: "Portfolio dropped below -2%",  time: "11m ago", dot: "#ff4d6d", icon: "↓" },
  { id: 3, text: "NVDA earnings report released", time: "1h ago",  dot: "#00b8d9", icon: "📊" },
  { id: 4, text: "Market closes in 30 minutes",  time: "3h ago",  dot: "#ffb800", icon: "⏱" },
];

const marqueeStocks = [
  { sym: "AAPL",  val: "+1.42%", up: true },
  { sym: "TSLA",  val: "-0.87%", up: false },
  { sym: "NVDA",  val: "+3.21%", up: true },
  { sym: "MSFT",  val: "+0.66%", up: true },
  { sym: "AMZN",  val: "-1.10%", up: false },
  { sym: "GOOGL", val: "+2.03%", up: true },
  { sym: "META",  val: "+1.55%", up: true },
  { sym: "NFLX",  val: "-0.44%", up: false },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const openNotif = (e) => setNotifAnchor(e.currentTarget);
  const closeNotif = () => setNotifAnchor(null);

  return (
    <motion.nav
      className={`${Styles.navbar} ${scrolled ? Styles.scrolled : ""}`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ticker marquee bar at very top */}
      <div className={Styles.tickerBar}>
        <div className={Styles.tickerTrack}>
          {[...marqueeStocks, ...marqueeStocks].map((s, i) => (
            <span key={i} className={Styles.tickerItem}>
              <span className={Styles.tickerSym}>{s.sym}</span>
              <span className={`${Styles.tickerVal} ${s.up ? Styles.up : Styles.down}`}>
                {s.up ? <TrendingUpIcon sx={{ fontSize: 10 }} /> : <TrendingDownIcon sx={{ fontSize: 10 }} />}
                {s.val}
              </span>
              <span className={Styles.tickerDot}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <div className={Styles.mainBar}>
        {/* Left — Brand */}
        <div className={Styles.brand}>
          <motion.div
            className={Styles.logoMark}
            whileHover={{ scale: 1.1, rotate: 8 }}
            transition={{ duration: 0.25 }}
          >
            <ShowChartIcon sx={{ fontSize: 16, color: "#00e5a0" }} />
          </motion.div>
          <div className={Styles.brandText}>
            <span className={Styles.brandName}>StockAdmin</span>
            <span className={Styles.brandSub}>Market Dashboard</span>
          </div>
        </div>

       

        {/* Right — Actions */}
        <div className={Styles.actions}>
          {/* Market status chip */}
          <div className={Styles.marketChip}>
            <span className={Styles.marketDot} />
            <span>NYSE OPEN</span>
          </div>

          <div className={Styles.vDivider} />

          {/* Notifications */}
          <Tooltip title="Alerts" arrow>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <IconButton className={Styles.iconBtn} onClick={openNotif}>
                <Badge
                  badgeContent={4}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: "linear-gradient(135deg, #ff4d6d, #cc2244)",
                      fontSize: 9,
                      minWidth: 16,
                      height: 16,
                      border: "1.5px solid #05101a",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 19, color: "#4a7a8a" }} />
                </Badge>
              </IconButton>
            </motion.div>
          </Tooltip>

          <div className={Styles.vDivider} />

          {/* Avatar */}
          <motion.div
            className={Styles.avatarWrap}
            onClick={openMenu}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className={Styles.avatarRing}>
              <Avatar className={Styles.avatar}>AM</Avatar>
            </div>
            <div className={Styles.userInfo}>
              <span className={Styles.userName}>Alex Monroe</span>
              <span className={Styles.userRole}>Super Admin</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Notification Menu ── */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={closeNotif}
        PaperProps={{ className: Styles.dropdownPaper }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={Styles.dropdownHeader}>
          <span>Market Alerts</span>
          <span className={Styles.clearBtn}>Clear all</span>
        </div>
        <Divider sx={{ borderColor: "rgba(0,180,255,0.07)" }} />
        {notifications.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <MenuItem className={Styles.notifItem} onClick={closeNotif}>
              <span className={Styles.notifIcon} style={{ color: n.dot }}>{n.icon}</span>
              <div className={Styles.notifContent}>
                <span className={Styles.notifText}>{n.text}</span>
                <span className={Styles.notifTime}>{n.time}</span>
              </div>
              <span className={Styles.notifDot} style={{ background: n.dot, boxShadow: `0 0 6px ${n.dot}` }} />
            </MenuItem>
          </motion.div>
        ))}
      </Menu>

      {/* ── Profile Menu ── */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        PaperProps={{ className: Styles.dropdownPaper }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={Styles.dropdownHeader}>
          <span>alex@stockadmin.io</span>
        </div>
        <Divider sx={{ borderColor: "rgba(0,180,255,0.07)" }} />
        {[
          { label: "Profile",  icon: <PersonOutlineIcon fontSize="small" /> },
          { label: "Settings", icon: <SettingsOutlinedIcon fontSize="small" /> },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <MenuItem className={Styles.menuItem} onClick={closeMenu}>
              <ListItemIcon sx={{ color: "#4a7a8a", minWidth: 32 }}>{item.icon}</ListItemIcon>
              {item.label}
            </MenuItem>
          </motion.div>
        ))}
        <Divider sx={{ borderColor: "rgba(0,180,255,0.07)", my: 0.5 }} />
        <MenuItem className={`${Styles.menuItem} ${Styles.logoutItem}`} onClick={closeMenu}>
          <ListItemIcon sx={{ color: "#ff4d6d", minWidth: 32 }}><LogoutIcon fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </motion.nav>
  );
};

export default Navbar;