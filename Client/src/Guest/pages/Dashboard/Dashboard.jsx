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
  ];

  const topGainers = [["SOL", "+4.1%"], ["ADA", "+3.5%"], ["TSLA", "+1.7%"]];
  const topLosers = [["DOGE", "-0.8%"], ["AMZN", "-0.9%"], ["XRP", "-1.1%"]];

  const newsItems = [
    ["Bitcoin hits new all-time high!", "Feb 1, 2026"],
    ["Ethereum network upgrades successfully", "Jan 30, 2026"],
    ["Solana adoption rising fast", "Jan 29, 2026"],
  ];

  return (
    <div className={Styles.heroContainer}>

      {/* HERO */}
      <div className={Styles.heroContent}>
        <h1 className={Styles.heading}>
          Redefining the Future of Crypto & Fintech Products
        </h1>
        <p className={Styles.paragraph}>
          AI-powered crypto trading with institutional-grade security.
        </p>
        <div className={Styles.heroButtons}>
          <Button variant="contained" size="large">Start Trading</Button>
          <Button variant="outlined" size="large">View Markets</Button>
        </div>
      </div>

      {/* MARKET STRIP */}
      <div className={Styles.marketStrip}>
        {marketData.slice(0, 5).map((coin, i) => (
          <div key={i} className={Styles.marketItem}>
            <strong>{coin[0]}</strong>
            <span>{coin[1]}</span>
            <span className={coin[2].includes("+") ? Styles.marketUp : Styles.marketDown}>
              {coin[2]}
            </span>
          </div>
        ))}
      </div>

      {/* TOP MOVERS */}
      <div className={Styles.topMovers}>
        <div className={Styles.moversGroup}>
          <h4>Top Gainers</h4>
          {topGainers.map((m, i) => (
            <div key={i} className={Styles.moverItem}>
              <strong>{m[0]}</strong>
              <span className={Styles.marketUp}>{m[1]}</span>
            </div>
          ))}
        </div>

        <div className={Styles.moversGroup}>
          <h4>Top Losers</h4>
          {topLosers.map((m, i) => (
            <div key={i} className={Styles.moverItem}>
              <strong>{m[0]}</strong>
              <span className={Styles.marketDown}>{m[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className={Styles.featureCards}>
        <div className={Styles.card}><SecurityIcon /><h3>Secure Trading</h3><p>Cold wallet protection.</p></div>
        <div className={Styles.card}><AccountBalanceWalletIcon /><h3>Smart Wallet</h3><p>Instant transfers.</p></div>
        <div className={Styles.card}><SmartToyIcon /><h3>AI Engine</h3><p>Auto strategies.</p></div>
        <div className={Styles.card}><TrendingUpIcon /><h3>Advanced Charts</h3><p>Deep analytics.</p></div>
        <div className={Styles.card}><h3>Staking</h3><p>Earn passive yield.</p></div>
        <div className={Styles.card}><h3>NFT Market</h3><p>Buy & sell NFTs.</p></div>
      </div>

      {/* STATS */}
      <div className={Styles.statsGrid}>
        {[["$4.2B+", "Daily Volume"], ["1.2M+", "Traders"], ["99.99%", "Uptime"], ["150+", "Countries"]]
          .map((s, i) => (
            <div key={i} className={Styles.statCard}>
              <h2>{s[0]}</h2>
              <p>{s[1]}</p>
            </div>
          ))}
      </div>

      {/* QUICK PAGES */}
      <div className={Styles.quickGrid}>
        {["Portfolio","Buy/Sell","Convert","Staking","Analytics","Signals","Watchlist","Reports"]
          .map((t,i)=>(
            <div key={i} className={Styles.quickCard}>
              <h3>{t}</h3>
              <p>Open module</p>
              <Button size="small" variant="outlined">Open</Button>
            </div>
          ))}
      </div>

      {/* TOOLS */}
      <div className={Styles.toolsGrid}>
        {["Risk Calculator","Backtesting","Strategy Builder","Tax Export"]
          .map((t,i)=>(
            <div key={i} className={Styles.toolCard}>
              <h3>{t}</h3>
              <p>Professional trading tool.</p>
            </div>
          ))}
      </div>

      {/* ACCOUNT */}
      <div className={Styles.accountGrid}>
        {["KYC","Security","2FA","API Keys","Wallets","Login History"]
          .map((t,i)=>(
            <div key={i} className={Styles.accountCard}>
              <h4>{t}</h4>
              <Button size="small">Manage</Button>
            </div>
          ))}
      </div>

      {/* ADMIN */}
      <div className={Styles.adminGrid}>
        {["User Management","Asset Listings","Fraud Alerts","Liquidity"]
          .map((t,i)=>(
            <div key={i} className={Styles.adminCard}>{t}</div>
          ))}
      </div>

      {/* TABLE */}
      <div className={Styles.tableWrap}>
        <h2>Top Markets</h2>
        <table className={Styles.marketTable}>
          <thead>
            <tr>
              <th>Asset</th><th>Price</th><th>24h</th><th>Volume</th><th></th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((r,i)=>(
              <tr key={i}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td className={r[2].includes("+") ? Styles.marketUp : Styles.marketDown}>{r[2]}</td>
                <td>{r[3]}</td>
                <td><Button size="small" variant="contained">Trade</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NEWS */}
      <div className={Styles.newsSection}>
        <div className={Styles.alertBox}>
          <strong>Market Alert:</strong> BTC crossed $63K 🚀
        </div>
        <div className={Styles.newsGrid}>
          {newsItems.map((n,i)=>(
            <div key={i} className={Styles.newsCard}>
              <h4>{n[0]}</h4>
              <p>{n[1]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={Styles.cards}>
        <div className={Styles.cards0}>
          <h3>Join Our Trading Network</h3>
        </div>
        <div className={Styles.cards00}>
          <p>Create account in minutes.</p>
          <Button variant="contained">Create Free Account</Button>
        </div>
      </div>

      {/* FOOTER */}
      <div className={Styles.footer}>
        <div className={Styles.top}>
          <div className={Styles.logo}>◼ TRADE</div>
        </div>
        <div className={Styles.links}>
          {["Markets","Trade","API","Docs","Support"].map((l,i)=>(
            <Link key={i} to="#">{l}</Link>
          ))}
        </div>
        <div className={Styles.copy}>© 2026 Trade Platform</div>
      </div>

    </div>
  );
};

export default Dashboard;
