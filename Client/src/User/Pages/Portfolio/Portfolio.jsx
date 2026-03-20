import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./Portfolio.module.css";

const Portfolio = () => {
  const uid = sessionStorage.getItem("uid");

  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/userportfolio/${uid}/`);
      setPortfolio(res.data.portfolio || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  const totals = useMemo(() => {
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

    return {
      totalInvestment,
      totalCurrentValue,
      totalProfitLoss,
    };
  }, [portfolio]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <div className={styles.loader}></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>Investments</p>
            <h2 className={styles.title}>My Portfolio</h2>
            <p className={styles.subtitle}>
              Track your holdings, value, and profit or loss
            </p>
          </div>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Total Investment</span>
            <h3 className={styles.summaryValue}>₹{totals.totalInvestment.toFixed(2)}</h3>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Current Value</span>
            <h3 className={styles.summaryValue}>₹{totals.totalCurrentValue.toFixed(2)}</h3>
          </div>

          <div className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Profit / Loss</span>
            <h3
              className={
                totals.totalProfitLoss >= 0
                  ? styles.profitValue
                  : styles.lossValue
              }
            >
              {totals.totalProfitLoss >= 0 ? "+" : "-"}₹
              {Math.abs(totals.totalProfitLoss).toFixed(2)}
            </h3>
          </div>
        </div>

        {portfolio.length === 0 ? (
          <div className={styles.emptyCard}>
            <h3>No Portfolio Data</h3>
            <p>You have no stocks in your portfolio yet.</p>
          </div>
        ) : (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Stock</th>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Investment</th>
                    <th>Current Value</th>
                    <th>Profit / Loss</th>
                  </tr>
                </thead>

                <tbody>
                  {portfolio.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.stock_name}</td>
                      <td>
                        <span className={styles.symbolBadge}>
                          {item.stock_symbol}
                        </span>
                      </td>
                      <td>{item.quantity}</td>
                      <td>₹{item.avg_price}</td>
                      <td>₹{item.current_price}</td>
                      <td>₹{item.investment}</td>
                      <td>₹{item.current_value}</td>
                      <td>
                        <span
                          className={
                            item.profit_loss >= 0
                              ? styles.profitBadge
                              : styles.lossBadge
                          }
                        >
                          {item.profit_loss >= 0
                            ? `+₹${item.profit_loss}`
                            : `-₹${Math.abs(item.profit_loss)}`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;