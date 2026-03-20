import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PlaceOrder.module.css";

const PlaceOrder = () => {
  const { stockid } = useParams();
  const uid = sessionStorage.getItem("uid");
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid price");
      return;
    }

    setLoading(true);

    const data = {
      user_id: uid,
      stock_id: stockid,
      order_type: orderType,
      order_quantity: Number(quantity),
      order_price: Number(price),
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/placeorder/", data);
      setMessage(res.data.message || "Order placed successfully");
      setQuantity("");
      setPrice("");
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.tag}>Trading</p>
          <h2 className={styles.title}>Place Order</h2>
          <p className={styles.subtitle}>
            Submit a buy or sell order for this stock
          </p>
        </div>

        {message && <div className={styles.successBox}>{message}</div>}
        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className={styles.select}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.input}
              min="1"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input}
              min="1"
              step="0.01"
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={orderType === "buy" ? styles.buyBtn : styles.sellBtn}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : orderType === "buy"
                ? "Place Buy Order"
                : "Place Sell Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;