import React from "react";
import Styles from "./About.module.css";

const About = () => {
  return (
    <div className={Styles.container}>
      {/* ===== HERO ===== */}
      <section className={Styles.hero}>
        <h1>About Our Trading Platform</h1>
        <p>
          We provide smart, fast, and secure stock market insights with
          real-time analytics, interactive charts, and portfolio tools —
          built for modern traders and investors.
        </p>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className={Styles.section}>
        <div className={Styles.grid2}>
          <div>
            <h2>What We Do</h2>
            <p>
              Our platform helps users track stock prices, analyze trends,
              simulate trades, and manage portfolios — all inside a clean,
              intuitive dashboard. Whether you're a beginner or an advanced
              trader, our tools help you make better decisions.
            </p>
            <p>
              We combine data visualization, risk indicators, and performance
              metrics to give you a complete market overview.
            </p>
          </div>

          <div className={Styles.cardHighlight}>
            <h3>Core Capabilities</h3>
            <ul>
              <li>Live stock tracking</li>
              <li>Interactive price charts</li>
              <li>Portfolio simulation</li>
              <li>Risk & trend indicators</li>
              <li>Market news integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={Styles.section}>
        <h2 className={Styles.center}>Platform Features</h2>

        <div className={Styles.featureGrid}>
          <div className={Styles.featureCard}>
            <h3>Real-Time Pricing</h3>
            <p>
              Track stock prices with fast refresh and change indicators to
              monitor gains and losses instantly.
            </p>
          </div>

          <div className={Styles.featureCard}>
            <h3>Advanced Charts</h3>
            <p>
              Visualize historical performance using interactive charts and
              trend overlays.
            </p>
          </div>

          <div className={Styles.featureCard}>
            <h3>Smart Watchlists</h3>
            <p>
              Save and monitor your favorite stocks with alerts and quick
              actions.
            </p>
          </div>

          <div className={Styles.featureCard}>
            <h3>Portfolio Tools</h3>
            <p>
              Simulate buying and selling to understand portfolio growth and
              risk exposure.
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className={Styles.stats}>
        <div>
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>
        <div>
          <h3>1200+</h3>
          <p>Stocks Tracked</p>
        </div>
        <div>
          <h3>5M+</h3>
          <p>Trades Simulated</p>
        </div>
        <div>
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
      </section>

      {/* ===== MISSION / VISION ===== */}
      <section className={Styles.section}>
        <div className={Styles.grid2}>
          <div className={Styles.cardSoft}>
            <h2>Our Mission</h2>
            <p>
              To make market intelligence accessible and understandable for
              everyone through powerful yet simple tools.
            </p>
          </div>

          <div className={Styles.cardSoft}>
            <h2>Our Vision</h2>
            <p>
              To become a leading digital trading workspace that empowers
              smarter investing decisions worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className={Styles.section}>
        <h2 className={Styles.center}>Our Team</h2>

        <div className={Styles.teamGrid}>
          <div className={Styles.teamCard}>
            <div className={Styles.avatar}>A</div>
            <h4>Arjun Mehta</h4>
            <p>Product Lead</p>
          </div>

          <div className={Styles.teamCard}>
            <div className={Styles.avatar}>S</div>
            <h4>Sneha Iyer</h4>
            <p>Market Analyst</p>
          </div>

          <div className={Styles.teamCard}>
            <div className={Styles.avatar}>R</div>
            <h4>Rahul Das</h4>
            <p>Engineering Head</p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={Styles.cta}>
        <h2>Start Trading Smarter Today</h2>
        <p>Explore markets, analyze trends, and build your strategy.</p>
        <button>Go to Dashboard</button>
      </section>
    </div>
  );
};

export default About;
