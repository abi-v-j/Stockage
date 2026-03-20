import React, { useState, useEffect } from "react";
import Styles from "./Dashboard.module.css";
import { Link } from "react-router";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const marketData = [
  { sym: "BTC", price: "$62,450", change: "+2.4%", vol: "$28B", up: true },
  { sym: "ETH", price: "$3,420", change: "+1.8%", vol: "$14B", up: true },
  { sym: "SOL", price: "$142", change: "+4.1%", vol: "$3.2B", up: true },
  { sym: "BNB", price: "$515", change: "+0.9%", vol: "$5.2B", up: true },
  { sym: "ADA", price: "$1.12", change: "+3.5%", vol: "$2.1B", up: true },
  { sym: "DOGE", price: "$0.075", change: "-0.8%", vol: "$1.2B", up: false },
  { sym: "DOT", price: "$42", change: "+1.2%", vol: "$0.9B", up: true },
  { sym: "XRP", price: "$0.92", change: "-1.1%", vol: "$1.8B", up: false },
];

const topGainers = [
  { sym: "SOL", change: "+4.1%", price: "$142" },
  { sym: "ADA", change: "+3.5%", price: "$1.12" },
  { sym: "TSLA", change: "+1.7%", price: "$248" },
];

const topLosers = [
  { sym: "DOGE", change: "-0.8%", price: "$0.075" },
  { sym: "AMZN", change: "-0.9%", price: "$178" },
  { sym: "XRP", change: "-1.1%", price: "$0.92" },
];

const newsItems = [
  { title: "Bitcoin hits new all-time high!", date: "Feb 1, 2026", tag: "BTC" },
  { title: "Ethereum network upgrades successfully", date: "Jan 30, 2026", tag: "ETH" },
  { title: "Solana adoption rising fast", date: "Jan 29, 2026", tag: "SOL" },
];

const stats = [
  { val: "$4.2B+", label: "Daily Volume" },
  { val: "1.2M+", label: "Active Traders" },
  { val: "99.99%", label: "Uptime SLA" },
  { val: "150+", label: "Countries" },
];

const quickModules = [
  { title: "Portfolio", icon: "◈", desc: "Track holdings" },
  { title: "Buy / Sell", icon: "⇅", desc: "Instant orders" },
  { title: "Convert", icon: "⟳", desc: "Swap assets" },
  { title: "Staking", icon: "◎", desc: "Earn yield" },
  { title: "Analytics", icon: "▦", desc: "Deep insights" },
  { title: "Signals", icon: "◉", desc: "AI alerts" },
  { title: "Watchlist", icon: "★", desc: "Track assets" },
  { title: "Reports", icon: "≡", desc: "Export data" },
];

const tools = [
  { title: "Risk Calculator", desc: "Estimate max drawdown and position sizing." },
  { title: "Backtesting", desc: "Replay strategies on historical data." },
  { title: "Strategy Builder", desc: "Drag-and-drop rule-based automation." },
  { title: "Tax Export", desc: "One-click P&L report for any jurisdiction." },
];

const features = [
  { icon: <SecurityIcon />, title: "Secure Trading", desc: "Cold wallet protection with multi-sig." },
  { icon: <AccountBalanceWalletIcon />, title: "Smart Wallet", desc: "Instant cross-chain transfers." },
  { icon: <SmartToyIcon />, title: "AI Engine", desc: "Adaptive automated strategies." },
  { icon: <TrendingUpIcon />, title: "Advanced Charts", desc: "50+ indicators, real-time data." },
  { icon: <span className={Styles.featureEmoji}>◎</span>, title: "Staking", desc: "Earn passive yield on idle assets." },
  { icon: <span className={Styles.featureEmoji}>◈</span>, title: "NFT Market", desc: "Buy, sell and mint NFTs." },
];

const accountItems = [
  { title: "KYC", sub: "Identity verified", done: true },
  { title: "Security", sub: "2 issues found", done: false },
  { title: "2FA", sub: "Enabled", done: true },
  { title: "API Keys", sub: "3 active", done: true },
  { title: "Wallets", sub: "5 connected", done: true },
  { title: "Login History", sub: "View sessions", done: true },
];

// Sparkline mini chart (pure SVG)
const Sparkline = ({ up }) => {
  const points = up
    ? "0,20 10,16 20,18 30,12 40,14 50,8 60,10 70,4 80,6 90,2"
    : "0,4 10,8 20,6 30,12 40,10 50,16 60,14 70,18 80,16 90,20";
  return (
    <svg width="90" height="24" viewBox="0 0 90 24" fill="none">
      <polyline
        points={points}
        stroke={up ? "#00d4a4" : "#ff4f6e"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [alertVisible, setAlertVisible] = useState(true);

  const filtered =
    activeTab === "all"
      ? marketData
      : activeTab === "gainers"
      ? marketData.filter((m) => m.up)
      : marketData.filter((m) => !m.up);

  return (
    <div className={Styles.page}>

      {/* ── ALERT BANNER ── */}
      {alertVisible && (
        <div className={Styles.alertBanner}>
          <span className={Styles.alertDot} />
          <strong>Market Alert:</strong>&nbsp; BTC crossed $63,000 — highest since Nov 2021
          <button className={Styles.alertClose} onClick={() => setAlertVisible(false)}>✕</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className={Styles.hero}>
        <div className={Styles.heroGrid}>
          <div className={Styles.heroLeft}>
            <div className={Styles.heroBadge}>
              <span className={Styles.badgeDot} /> Live Markets · 2,400+ assets
            </div>
            <h1 className={Styles.heroHeading}>
              Redefining the<br />
              <span className={Styles.heroAccent}>Future of Trading</span>
            </h1>
            <p className={Styles.heroPara}>
              AI-powered execution, institutional-grade security, and real-time analytics — all in one platform.
            </p>
            <div className={Styles.heroCtas}>
              <Link to="/Userhome/ViewMarkets" className={Styles.btnPrimary}>Start Trading</Link>
              <Link to="/Userhome/ViewMarkets" className={Styles.btnOutline}>Explore Markets</Link>
            </div>
          </div>

          {/* Hero mini-card */}
          <div className={Styles.heroCard}>
            <div className={Styles.heroCardHeader}>
              <span className={Styles.heroCardTitle}>Portfolio</span>
              <span className={Styles.heroCardBadge}>+12.4% MTD</span>
            </div>
            <div className={Styles.heroCardVal}>$48,204.50</div>
            <div className={Styles.heroCardSub}>↑ $5,310.22 this month</div>
            <div className={Styles.heroCardChart}>
              {[40, 55, 45, 70, 60, 80, 75, 90, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className={Styles.heroBar}
                  style={{ height: `${h}%`, opacity: 0.4 + i * 0.06 }}
                />
              ))}
            </div>
            <div className={Styles.heroCardAssets}>
              {marketData.slice(0, 4).map((m) => (
                <div key={m.sym} className={Styles.heroAsset}>
                  <span className={Styles.heroAssetSym}>{m.sym}</span>
                  <span className={m.up ? Styles.up : Styles.down}>{m.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={Styles.statsSection}>
        {stats.map((s, i) => (
          <div key={i} className={Styles.statCard}>
            <div className={Styles.statVal}>{s.val}</div>
            <div className={Styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── MARKET TABLE ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Top Markets</h2>
          <div className={Styles.tabs}>
            {["all", "gainers", "losers"].map((t) => (
              <button
                key={t}
                className={`${Styles.tab} ${activeTab === t ? Styles.tabActive : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={Styles.tableWrap}>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Asset</th>
                <th>Price</th>
                <th>24h</th>
                <th>Volume</th>
                <th>7d Trend</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.sym} className={Styles.tableRow}>
                  <td className={Styles.tableIdx}>{i + 1}</td>
                  <td>
                    <div className={Styles.assetCell}>
                      <div className={Styles.assetAvatar}>{r.sym[0]}</div>
                      <strong>{r.sym}</strong>
                    </div>
                  </td>
                  <td className={Styles.monoVal}>{r.price}</td>
                  <td>
                    <span className={`${Styles.changePill} ${r.up ? Styles.pillUp : Styles.pillDown}`}>
                      {r.change}
                    </span>
                  </td>
                  <td className={Styles.mutedVal}>{r.vol}</td>
                  <td><Sparkline up={r.up} /></td>
                  <td>
                    <Link to="/Userhome/ViewMarkets" className={Styles.tradeBtn}>Trade</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TOP MOVERS ── */}
      <section className={Styles.moversSection}>
        <div className={Styles.moversCol}>
          <div className={Styles.moversHeader}>
            <span className={Styles.moversIcon}>▲</span> Top Gainers
          </div>
          {topGainers.map((m) => (
            <div key={m.sym} className={Styles.moverRow}>
              <div className={Styles.assetAvatar}>{m.sym[0]}</div>
              <div className={Styles.moverInfo}>
                <strong>{m.sym}</strong>
                <span className={Styles.mutedVal}>{m.price}</span>
              </div>
              <span className={`${Styles.changePill} ${Styles.pillUp}`}>{m.change}</span>
            </div>
          ))}
        </div>

        <div className={Styles.moversDivider} />

        <div className={Styles.moversCol}>
          <div className={Styles.moversHeader}>
            <span className={Styles.moversIconRed}>▼</span> Top Losers
          </div>
          {topLosers.map((m) => (
            <div key={m.sym} className={Styles.moverRow}>
              <div className={Styles.assetAvatar}>{m.sym[0]}</div>
              <div className={Styles.moverInfo}>
                <strong>{m.sym}</strong>
                <span className={Styles.mutedVal}>{m.price}</span>
              </div>
              <span className={`${Styles.changePill} ${Styles.pillDown}`}>{m.change}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Platform Features</h2>
        </div>
        <div className={Styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={Styles.featureCard}>
              <div className={Styles.featureIcon}>{f.icon}</div>
              <h3 className={Styles.featureTitle}>{f.title}</h3>
              <p className={Styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUICK MODULES ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Quick Access</h2>
        </div>
        <div className={Styles.quickGrid}>
          {quickModules.map((m, i) => (
            <div key={i} className={Styles.quickCard}>
              <div className={Styles.quickIcon}>{m.icon}</div>
              <div className={Styles.quickTitle}>{m.title}</div>
              <div className={Styles.quickDesc}>{m.desc}</div>
              <button className={Styles.quickBtn}>Open →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Pro Tools</h2>
          <span className={Styles.proBadge}>PRO</span>
        </div>
        <div className={Styles.toolsGrid}>
          {tools.map((t, i) => (
            <div key={i} className={Styles.toolCard}>
              <div className={Styles.toolNum}>0{i + 1}</div>
              <h3 className={Styles.toolTitle}>{t.title}</h3>
              <p className={Styles.toolDesc}>{t.desc}</p>
              <button className={Styles.toolBtn}>Launch</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Market News</h2>
        </div>
        <div className={Styles.newsGrid}>
          {newsItems.map((n, i) => (
            <div key={i} className={Styles.newsCard}>
              <div className={Styles.newsTag}>{n.tag}</div>
              <h4 className={Styles.newsTitle}>{n.title}</h4>
              <span className={Styles.newsDate}>{n.date}</span>
              <button className={Styles.newsBtn}>Read →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCOUNT ── */}
      <section className={Styles.section}>
        <div className={Styles.sectionHeader}>
          <h2 className={Styles.sectionTitle}>Account Settings</h2>
        </div>
        <div className={Styles.accountGrid}>
          {accountItems.map((a, i) => (
            <div key={i} className={Styles.accountCard}>
              <div className={Styles.accountStatus}>
                <span className={a.done ? Styles.statusDone : Styles.statusWarn} />
                {a.done ? "Active" : "Action needed"}
              </div>
              <h4 className={Styles.accountTitle}>{a.title}</h4>
              <p className={Styles.accountSub}>{a.sub}</p>
              <button className={Styles.accountBtn}>Manage</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={Styles.ctaSection}>
        <div className={Styles.ctaGlow} />
        <h2 className={Styles.ctaTitle}>Ready to trade smarter?</h2>
        <p className={Styles.ctaSub}>Join 1.2 million traders. Create your account in under 2 minutes.</p>
        <div className={Styles.ctaBtns}>
          <Link to="/users/login" className={Styles.btnPrimary}>Create Free Account</Link>
          <Link to="/Userhome/ViewMarkets" className={Styles.btnGhost}>View Markets</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={Styles.footer}>
        <div className={Styles.footerTop}>
          <div className={Styles.footerLogo}>◼ TICKERPRO</div>
          <div className={Styles.footerLinks}>
            {["Markets", "Trade", "API", "Docs", "Support"].map((l) => (
              <Link key={l} to="#" className={Styles.footerLink}>{l}</Link>
            ))}
          </div>
        </div>
        <div className={Styles.footerBottom}>
          <span>© 2026 TickerPro Platform. All rights reserved.</span>
          <span>Trading involves risk. Not financial advice.</span>
        </div>
      </footer>

    </div>
  );
};

export default Dashboard;