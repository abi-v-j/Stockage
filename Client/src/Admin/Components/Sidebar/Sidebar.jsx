import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Styles from './Sidebar.module.css';

const menu = [
  { name: "Dashboard",   icon: <DashboardOutlinedIcon />,             path: "/admin/",            group: "core",    tag: null },
  { name: "View Stock",  icon: <InventoryOutlinedIcon />,             path: "/admin/Viewstock",   group: "stocks",  tag: "LIVE" },
  { name: "Add Stock",   icon: <AddBoxOutlinedIcon />,                path: "/admin/Addstock",    group: "stocks",  tag: null },
  { name: "Companies",   icon: <BusinessOutlinedIcon />,              path: "/admin/Viewcompany", group: "market",  tag: null },
  { name: "Add Company", icon: <AddBusinessOutlinedIcon />,           path: "/admin/AddCompany",  group: "market",  tag: null },
  { name: "Category",    icon: <CategoryOutlinedIcon />,              path: "/admin/Category",    group: "market",  tag: null },
  { name: "Reports",     icon: <BarChartIcon />,                      path: "/admin/Reports",     group: "finance", tag: "NEW" },
  { name: "Wallet",      icon: <AccountBalanceWalletOutlinedIcon />,  path: "/admin/Wallet",      group: "finance", tag: null },
  { name: "Accounts",    icon: <ManageAccountsOutlinedIcon />,        path: "/admin/Accounts",    group: "finance", tag: null },
];

const groups = [
  { key: "core",    label: "Overview" },
  { key: "stocks",  label: "Stocks" },
  { key: "market",  label: "Market" },
  { key: "finance", label: "Finance" },
];

const sidebarVariants = {
  open:   { width: 248, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  closed: { width: 72,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const Sparkline = ({ up = true }) => (
  <svg width="34" height="12" viewBox="0 0 34 12" fill="none">
    {up
      ? <polyline points="0,10 5,8 10,9 15,5 20,6 26,2 34,1"
          stroke="#00e5a0" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      : <polyline points="0,2 5,4 10,3 16,6 22,5 28,9 34,11"
          stroke="#ff4d6d" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    }
  </svg>
);

const tickers = [
  { sym: 'AAPL', val: '+1.42%', up: true },
  { sym: 'TSLA', val: '-0.87%', up: false },
  { sym: 'NVDA', val: '+3.21%', up: true },
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <motion.aside
      className={Styles.sidebar}
      variants={sidebarVariants}
      animate={open ? 'open' : 'closed'}
      initial="open"
    >
      {/* Ambient glow orbs */}
      <div className={Styles.orb1} />
      <div className={Styles.orb2} />

      {/* ── Brand + Toggle Row ── */}
      <div className={Styles.brandRow}>
        <div className={Styles.brand}>
          <motion.div
            className={Styles.logoMark}
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ duration: 0.25 }}
          >
            <TrendingUpIcon sx={{ fontSize: 16, color: '#00e5a0' }} />
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div
                className={Styles.brandTextWrap}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className={Styles.brandName}>StockAdmin</span>
                <span className={Styles.brandStatus}>
                  <span className={Styles.statusPulse} />
                  MARKET OPEN
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle — always visible, inside the sidebar */}
        <motion.button
          className={Styles.toggleBtn}
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(0,229,160,0.12)' }}
          whileTap={{ scale: 0.88 }}
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          title={open ? 'Collapse' : 'Expand'}
        >
          <ChevronLeftIcon sx={{ fontSize: 16, color: '#00e5a0' }} />
        </motion.button>
      </div>

      {/* ── Mini Ticker Strip ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={Styles.tickerStrip}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 0.26 }}
          >
            {tickers.map((t) => (
              <div key={t.sym} className={Styles.tickerRow}>
                <span className={Styles.tickerSym}>{t.sym}</span>
                <Sparkline up={t.up} />
                <span className={`${Styles.tickerVal} ${t.up ? Styles.up : Styles.down}`}>
                  {t.val}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav ── */}
      <nav className={Styles.nav}>
        {groups.map((group) => {
          const items = menu.filter(m => m.group === group.key);
          return (
            <div key={group.key} className={Styles.group}>
              <AnimatePresence>
                {open && (
                  <motion.span
                    className={Styles.groupLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {group.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {items.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <Tooltip key={i} title={!open ? item.name : ''} placement="right" arrow>
                    <Link to={item.path} className={Styles.linkWrap}>
                      <motion.div
                        className={`${Styles.navItem} ${isActive ? Styles.active : ''}`}
                        whileHover={{ x: open ? 3 : 0, scale: !open ? 1.08 : 1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                      >
                        {isActive && (
                          <motion.div
                            className={Styles.activeBg}
                            layoutId="activeBg"
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                        {isActive && <div className={Styles.activeBar} />}

                        <span className={`${Styles.iconWrap} ${isActive ? Styles.iconActive : ''}`}>
                          {item.icon}
                        </span>

                        <AnimatePresence>
                          {open && (
                            <motion.span
                              className={Styles.label}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.18, delay: 0.04 }}
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {open && item.tag && (
                          <span className={`${Styles.tag} ${item.tag === 'LIVE' ? Styles.tagLive : Styles.tagNew}`}>
                            {item.tag === 'LIVE' && <span className={Styles.tagPulse} />}
                            {item.tag}
                          </span>
                        )}
                      </motion.div>
                    </Link>
                  </Tooltip>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className={Styles.footer}>
        <div className={Styles.footerAvatar}>AM</div>
        <AnimatePresence>
          {open && (
            <motion.div
              className={Styles.footerText}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <span className={Styles.footerName}>Alex Monroe</span>
              <span className={Styles.footerRole}>Super Admin</span>
            </motion.div>
          )}
        </AnimatePresence>
        {open && (
          <div className={Styles.footerOnline}>
            <span className={Styles.onlineDot} />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;