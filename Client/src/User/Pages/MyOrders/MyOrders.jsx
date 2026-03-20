import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
  const uid = sessionStorage.getItem("uid");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/myorders/${uid}/`
      );
      setOrders(res.data.orderdata || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === 0) return styles.pending;
    if (status === 1) return styles.executed;
    return styles.cancelled;
  };

  const getStatusText = (status) => {
    if (status === 0) return "Pending";
    if (status === 1) return "Executed";
    return "Cancelled";
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <div className={styles.loader}></div>
          <p>Loading orders...</p>
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
        
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tag}>Trading</p>
          <h2 className={styles.title}>My Orders</h2>
          <p className={styles.subtitle}>
            Track all your buy and sell transactions
          </p>
        </div>

        {/* Empty */}
        {orders.length === 0 ? (
          <div className={styles.emptyCard}>
            <h3>No Orders Found</h3>
            <p>You have not placed any orders yet.</p>
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
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date Time</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>{item.order_stock_id__stock_name}</td>

                      <td>
                        <span className={styles.symbol}>
                          {item.order_stock_id__stock_symbol}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            item.order_type === "buy"
                              ? styles.buy
                              : styles.sell
                          }
                        >
                          {item.order_type.toUpperCase()}
                        </span>
                      </td>

                      <td>{item.order_quantity}</td>

                      <td>₹{item.order_price}</td>

                      <td>
                        <span
                          className={`${styles.status} ${getStatusClass(
                            item.order_status
                          )}`}
                        >
                          {getStatusText(item.order_status)}
                        </span>
                      </td>

                      <td className={styles.date}>
                        {item.order_datetime}
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

export default MyOrders;