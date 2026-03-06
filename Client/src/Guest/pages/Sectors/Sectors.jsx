import React from "react";
import Styles from "./Sectors.module.css";

const sectors = [
  {
    name: "Technology",
    desc: "Software, AI, cloud, and hardware companies driving innovation.",
    stocks: 320,
    growth: "+18%",
    icon: "💻",
  },
  {
    name: "Healthcare",
    desc: "Pharma, biotech, and medical device companies.",
    stocks: 210,
    growth: "+9%",
    icon: "🧬",
  },
  {
    name: "Finance",
    desc: "Banks, insurance, and investment institutions.",
    stocks: 180,
    growth: "+6%",
    icon: "🏦",
  },
  {
    name: "Energy",
    desc: "Oil, gas, renewable, and power producers.",
    stocks: 95,
    growth: "+4%",
    icon: "⚡",
  },
  {
    name: "Consumer Goods",
    desc: "Retail, FMCG, and daily-use product companies.",
    stocks: 260,
    growth: "+7%",
    icon: "🛒",
  },
  {
    name: "Automobile",
    desc: "Vehicle manufacturers and EV innovators.",
    stocks: 120,
    growth: "+11%",
    icon: "🚗",
  },
  {
    name: "Telecom",
    desc: "Connectivity, wireless, and network providers.",
    stocks: 60,
    growth: "+5%",
    icon: "📡",
  },
  {
    name: "Infrastructure",
    desc: "Construction, logistics, and urban development.",
    stocks: 140,
    growth: "+8%",
    icon: "🏗️",
  },
];

const Sectors = () => {
  return (
    <div className={Styles.container}>
      {/* HERO */}
      <section className={Styles.hero}>
        <h1>Market Sectors</h1>
        <p>
          Explore stocks grouped by industry sectors. Compare performance,
          track growth, and discover opportunities across the market.
        </p>
      </section>

      {/* OVERVIEW STATS */}
      <section className={Styles.statsRow}>
        <div className={Styles.statCard}>
          <h3>8</h3>
          <p>Total Sectors</p>
        </div>
        <div className={Styles.statCard}>
          <h3>1,385+</h3>
          <p>Stocks Listed</p>
        </div>
        <div className={Styles.statCard}>
          <h3>+9.2%</h3>
          <p>Avg Sector Growth</p>
        </div>
        <div className={Styles.statCard}>
          <h3>Live</h3>
          <p>Market Tracking</p>
        </div>
      </section>

      {/* SECTOR GRID */}
      <section className={Styles.grid}>
        {sectors.map((sec, i) => (
          <div key={i} className={Styles.card}>
            <div className={Styles.cardTop}>
              <div className={Styles.icon}>{sec.icon}</div>
              <span className={Styles.growth}>{sec.growth}</span>
            </div>

            <h3>{sec.name}</h3>
            <p>{sec.desc}</p>

            <div className={Styles.cardBottom}>
              <span>{sec.stocks} Stocks</span>
              <button>View Sector</button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={Styles.cta}>
        <h2>Diversify Across Sectors</h2>
        <p>
          Smart portfolios are built with sector balance. Analyze before you
          invest.
        </p>
        <button>Open Market Screener</button>
      </section>
    </div>
  );
};

export default Sectors;
