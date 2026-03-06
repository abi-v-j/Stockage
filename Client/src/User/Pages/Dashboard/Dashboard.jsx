import React from "react";
import Styles from "./Dashboard.module.css";
import { Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Link } from "react-router";

const Dashboard = () => {
  const marketData = [
    ["BTC", "$62,450", "+2.4%", "$28B"],
    ["ETH", "$3,420", "+1.8%", "$14B"],
    ["SOL", "$142", "+4.1%", "$3.2B"],
    ["BNB", "$515", "+0.9%", "$5.2B"],
    ["ADA", "$1.12", "+3.5%", "$2.1B"],
    ["DOGE", "$0.075", "-0.8%", "$1.2B"],
    ["DOT", "$42", "+1.2%", "$0.9B"],
    ["XRP", "$0.92", "-1.1%", "$1.8B"],
    ["TSLA", "$900", "+1.7%", "$10B"],
    ["AAPL", "$174", "+2.1%", "$12B"],
    ["AMZN", "$3,400", "-0.9%", "$8B"],
    ["GOOGL", "$2,950", "+1.3%", "$6B"],
  ];

  const topGainers = [
    ["SOL", "+4.1%"],
    ["ADA", "+3.5%"],
    ["TSLA", "+1.7%"],
  ];

  const topLosers = [
    ["DOGE", "-0.8%"],
    ["AMZN", "-0.9%"],
    ["XRP", "-1.1%"],
  ];

  const newsItems = [
    ["Bitcoin hits new all-time high!", "Feb 1, 2026"],
    ["Ethereum network upgrades successfully", "Jan 30, 2026"],
    ["Solana ecosystem sees surge in adoption", "Jan 29, 2026"],
    ["Cardano smart contracts live", "Jan 28, 2026"],
  ];

  return (
    <div className={Styles.heroContainer}>
      {/* ================= HERO ================= */}
      <div className={Styles.heroContent}>
        <h1 className={Styles.heading}>
          Redefining the Future of Crypto & Fintech Products
        </h1>
        <p className={Styles.paragraph}>
          Next-generation crypto trading platform with AI automation,
          institutional-grade security, and real-time analytics.
        </p>
        <div className={Styles.heroButtons}>
          <Button variant="contained" size="large">Start Trading</Button>
          
          <Button variant="outlined" size="large">View Markets</Button>
        </div>
      </div>

      {/* ================= LIVE MARKET STRIP ================= */}
      <div className={Styles.marketStrip}>
        {marketData.slice(0, 5).map((coin, i) => (
          <div key={i} className={Styles.marketItem}>
            <strong>{coin[0]}</strong>
            <span>{coin[1]}</span>
            <span className={coin[2].includes("+") ? Styles.marketUp : Styles.marketDown}>{coin[2]}</span>
          </div>
        ))}
      </div>

      {/* ================= TOP MOVERS ================= */}
      <div className={Styles.topMovers}>
        <div className={Styles.moversGroup}>
          <h4>Top Gainers</h4>
          {topGainers.map((item, i) => (
            <div key={i} className={Styles.moverItem}>
              <strong>{item[0]}</strong>
              <span className={Styles.marketUp}>{item[1]}</span>
            </div>
          ))}
        </div>
        <div className={Styles.moversGroup}>
          <h4>Top Losers</h4>
          {topLosers.map((item, i) => (
            <div key={i} className={Styles.moverItem}>
              <strong>{item[0]}</strong>
              <span className={Styles.marketDown}>{item[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FEATURE CARDS ================= */}
      <div className={Styles.featureCards}>
        <div className={Styles.card}>
          <SecurityIcon />
          <h3>Secure Trading</h3>
          <p>Multi-layer blockchain + cold wallet protection.</p>
        </div>
        <div className={Styles.card}>
          <AccountBalanceWalletIcon />
          <h3>Smart Wallet</h3>
          <p>Instant deposits & lightning withdrawals.</p>
        </div>
        <div className={Styles.card}>
          <SmartToyIcon />
          <h3>AI Trade Engine</h3>
          <p>Auto strategies & predictive signals.</p>
        </div>
        <div className={Styles.card}>
          <TrendingUpIcon />
          <h3>Advanced Charts</h3>
          <p>Indicators, overlays & deep analytics.</p>
        </div>
        <div className={Styles.card}>
          <h3>Staking & Yield</h3>
          <p>Earn passive income on your crypto holdings.</p>
        </div>
        <div className={Styles.card}>
          <h3>Mobile App</h3>
          <p>Trade anywhere with our responsive mobile app.</p>
        </div>
        <div className={Styles.card}>
          <h3>Portfolio Tracker</h3>
          <p>View your assets across exchanges in one place.</p>
        </div>
        <div className={Styles.card}>
          <h3>Margin Trading</h3>
          <p>Leverage trades safely with advanced risk tools.</p>
        </div>
        <div className={Styles.card}>
          <h3>NFT Marketplace</h3>
          <p>Buy, sell, and track digital assets and NFTs.</p>
        </div>
        <div className={Styles.card}>
          <h3>Crypto Lending</h3>
          <p>Earn interest by lending your crypto assets.</p>
        </div>
      </div>

      {/* ================= STATS / TRUST METRICS ================= */}
      <div className={Styles.statsGrid}>
        {[
          ["$4.2B+", "Daily Volume"],
          ["1.2M+", "Active Traders"],
          ["99.99%", "Uptime"],
          ["150+", "Countries"],
          ["500+", "Listed Assets"],
          ["24/7", "Support"],
          ["1,000+", "Institutions"],
          ["12+", "Global Offices"]
        ].map((s, i) => (
          <div key={i} className={Styles.statCard}>
            <h2>{s[0]}</h2>
            <p>{s[1]}</p>
          </div>
        ))}
      </div>

      {/* ================= TOP MARKETS TABLE ================= */}
      <div className={Styles.tableWrap}>
        <h2>Top Markets</h2>
        <table className={Styles.marketTable}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>24h</th>
              <th>Volume</th>
              <th>Trade</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((row, i) => (
              <tr key={i}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td className={row[2].includes("+") ? Styles.marketUp : Styles.marketDown}>{row[2]}</td>
                <td>{row[3]}</td>
                <td><Button size="small" variant="contained">Trade</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= NEWS / ALERTS ================= */}
      <div className={Styles.newsSection}>
        <div className={Styles.alertBox}>
          <strong>Market Alert:</strong> Bitcoin just crossed $63K! 🚀
        </div>
        <h2>Crypto Insights & Updates</h2>
        <div className={Styles.newsGrid}>
          {newsItems.map((item, i) => (
            <div key={i} className={Styles.newsCard}>
              <h4>{item[0]}</h4>
              <p>{item[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className={Styles.cards}>
        <div className={Styles.cards0}>
          <h3>Join Our Blockchain Trading Network</h3>
        </div>
        <div className={Styles.cards00}>
          <p>Open your account in minutes. Zero hidden fees. AI-powered trading tools included.</p>
          <Button variant="contained" size="large">Create Free Account</Button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className={Styles.footer}>
        <div className={Styles.top}>
          <div className={Styles.logo}>◼ TRADE</div>
          <div className={Styles.tags}>
            <span>INSTANT EXECUTION</span>
            <span>AI SIGNALS</span>
            <span>PRO SECURITY</span>
          </div>
        </div>
        <div className={Styles.divider}></div>
        <div className={Styles.links}>
          {["Markets", "Trade", "API", "Docs", "Support"].map((item, i) => (
            <Link key={i} to="#">{item}</Link>
          ))}
        </div>
        <div className={Styles.bottom}>
          <div className={Styles.policies}>
            <a href="#">Terms</a>
            <span>|</span>
            <a href="#">Privacy</a>
            <span>|</span>
            <a href="#">Disclosures</a>
          </div>
          <div className={Styles.copy}>© 2026 Trade Platform. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
