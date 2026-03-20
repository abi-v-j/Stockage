import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import styles from "./ViewStocks.module.css";

const ViewStocks = () => {
  const { id } = useParams();
  const uid = sessionStorage.getItem("uid");

  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/userviewstocks/${id}/`);
      console.log(res.data);
      
      setStockList(res.data.stockdata || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load stocks");
    } finally {
      setLoading(false);
    }
  };

  const openOrderModal = (sid, type) => {
    setSelectedStockId(sid);
    setSelectedType(type);
    setQuantity("");
    setMessage("");
    setError("");
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setShowModal(false);
    setSelectedStockId(null);
    setSelectedType("");
    setQuantity("");
  };

  const submitOrder = async () => {
    setMessage("");
    setError("");

    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    try {
      const res = await axios.post(`http://127.0.0.1:8000/placeorder/`, {
        user_id: uid,
        stock_id: selectedStockId,
        order_type: selectedType,
        order_quantity: quantity,
        order_price: 1,
      });

      setMessage(res.data.message || "Order placed successfully");
      closeOrderModal();
      loadStocks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <div className={styles.loader}></div>
          <p>Loading stocks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>Market</p>
            <h2 className={styles.title}>Company Stocks</h2>
            <p className={styles.subtitle}>
              View available stocks and place buy or sell orders
            </p>
          </div>
        </div>

        {message && <div className={styles.successBox}>{message}</div>}
        {error && <div className={styles.errorBox}>{error}</div>}

        {stockList.length === 0 ? (
          <div className={styles.emptyCard}>
            <h3>No Stocks Found</h3>
            <p>There are no stocks available for this company right now.</p>
          </div>
        ) : (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Symbol</th>
                    <th>Stock Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Buy</th>
                    <th>Sell</th>
                  </tr>
                </thead>

                <tbody>
                  {stockList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className={styles.symbolBadge}>
                          {item.stock_symbol}
                        </span>
                      </td>
                      <td>{item.stock_name}</td>
                      <td>{item.category_id__category_name}</td>
                      <td>
                        <span
                          className={
                            item.stock_status == 1
                              ? styles.activeBadge
                              : styles.inactiveBadge
                          }
                        >
                          {item.stock_status == 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.buyBtn}
                          onClick={() => openOrderModal(item.id, "buy")}
                          disabled={item.stock_status !== 1}
                        >
                          Buy
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.sellBtn}
                          onClick={() => openOrderModal(item.id, "sell")}
                          disabled={item.stock_status !== 1}
                        >
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>
              {selectedType === "buy" ? "Buy Stock" : "Sell Stock"}
            </h3>
            <p className={styles.modalText}>
              Enter the quantity you want to {selectedType}.
            </p>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className={styles.modalInput}
            />

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={closeOrderModal}>
                Cancel
              </button>
              <button className={styles.confirmBtn} onClick={submitOrder}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStocks;