import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import styles from "./UserDash.module.css";

const API = "http://127.0.0.1:8000";

const MarketChart = ({ symbol = "NASDAQ:AAPL" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.height = "100%";
    wrapper.style.width = "100%";

    const chart = document.createElement("div");
    chart.className = "tradingview-widget-container__widget";
    chart.style.height = "100%";
    chart.style.width = "100%";

    wrapper.appendChild(chart);
    wrapper.appendChild(script);
    containerRef.current.appendChild(wrapper);
  }, [symbol]);

  return <div ref={containerRef} className={styles.chartInner}></div>;
};

const UserDash = () => {
  const uid = sessionStorage.getItem("uid");

  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSymbol, setSelectedSymbol] = useState("NASDAQ:AAPL");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [walletRes, portfolioRes, orderRes] = await Promise.all([
        axios.get(`${API}/userwallet/${uid}/`),
        axios.get(`${API}/userportfolio/${uid}/`),
        axios.get(`${API}/myorders/${uid}/`),
      ]);

      setWallet(walletRes.data.wallet_balance || 0);
      setPortfolio(portfolioRes.data.portfolio || []);
      setOrders(orderRes.data.orderdata || []);
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const summary = useMemo(() => {
    const totalInvestment = portfolio.reduce(
      (sum, item) => sum + Number(item.investment || 0),
      0
    );

    const totalCurrentValue = portfolio.reduce(
      (sum, item) => sum + Number(item.current_value || 0),
      0
    );

    const totalProfitLoss = portfolio.reduce(
      (sum, item) => sum + Number(item.profit_loss || 0),
      0
    );

    const pendingOrders = orders.filter((item) => item.order_status === 0).length;

    return {
      totalInvestment,
      totalCurrentValue,
      totalProfitLoss,
      pendingOrders,
      totalOrders: orders.length,
    };
  }, [portfolio, orders]);

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <div className={styles.loader}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>Overview</p>
            <h2 className={styles.title}>User Dashboard</h2>
            <p className={styles.subtitle}>
              Track your wallet, portfolio, orders, and live market graph
            </p>
          </div>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Wallet Balance</span>
            <h3 className={styles.statValue}>₹{wallet}</h3>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Investment</span>
            <h3 className={styles.statValue}>₹{summary.totalInvestment.toFixed(2)}</h3>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Current Value</span>
            <h3 className={styles.statValue}>₹{summary.totalCurrentValue.toFixed(2)}</h3>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Profit / Loss</span>
            <h3
              className={
                summary.totalProfitLoss >= 0 ? styles.profitText : styles.lossText
              }
            >
              {summary.totalProfitLoss >= 0 ? "+" : "-"}₹
              {Math.abs(summary.totalProfitLoss).toFixed(2)}
            </h3>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Orders</span>
            <h3 className={styles.statValue}>{summary.totalOrders}</h3>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Pending Orders</span>
            <h3 className={styles.statValue}>{summary.pendingOrders}</h3>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.chartCard}>
            <div className={styles.cardTop}>
              <div>
                <h3 className={styles.cardTitle}>Live Stock Market Graph</h3>
                <p className={styles.cardSub}>
                  View real-time style market chart
                </p>
              </div>

              <select
                className={styles.select}
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
              >
                <option value="NASDAQ:AAPL">AAPL</option>
                <option value="NASDAQ:TSLA">TSLA</option>
                <option value="NASDAQ:MSFT">MSFT</option>
                <option value="NASDAQ:GOOGL">GOOGL</option>
                <option value="NASDAQ:NVDA">NVDA</option>
                <option value="NSE:RELIANCE">RELIANCE</option>
                <option value="NSE:TCS">TCS</option>
                <option value="NSE:INFY">INFY</option>
                <option value="NSE:HDFCBANK">HDFCBANK</option>
              </select>
            </div>

            <div className={styles.chartBox}>
              <MarketChart symbol={selectedSymbol} />
            </div>
          </div>

          <div className={styles.sideCard}>
            <div className={styles.cardTop}>
              <div>
                <h3 className={styles.cardTitle}>Recent Orders</h3>
                <p className={styles.cardSub}>Latest 5 transactions</p>
              </div>
            </div>

            {recentOrders.length === 0 ? (
              <div className={styles.emptyBox}>No orders found</div>
            ) : (
              <div className={styles.orderList}>
                {recentOrders.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
                    <div>
                      <div className={styles.orderName}>
                        {item.order_stock_id__stock_name}
                      </div>
                      <div className={styles.orderMeta}>
                        {item.order_stock_id__stock_symbol} • Qty: {item.order_quantity}
                      </div>
                    </div>

                    <div className={styles.orderRight}>
                      <div
                        className={
                          item.order_type === "buy"
                            ? styles.buyBadge
                            : styles.sellBadge
                        }
                      >
                        {item.order_type}
                      </div>
                      <div className={styles.orderPrice}>₹{item.order_price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;