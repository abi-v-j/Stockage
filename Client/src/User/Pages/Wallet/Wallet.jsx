import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Wallet.module.css";

const Wallet = () => {
  const uid = sessionStorage.getItem("uid");

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/userwallet/${uid}/`
      );
      setBalance(res.data.wallet_balance || 0);
    } catch (err) {
      setError("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  const addMoney = async () => {
    setMessage("");
    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("Enter valid amount");
      return;
    }

    setAdding(true);

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/addmoney/${uid}/`,
        {
          amount: Number(amount),
        }
      );

      setMessage(res.data.message || "Money added successfully");
      setAmount("");
      loadWallet();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add money");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loader}></div>
        <p>Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tag}>Finance</p>
          <h2 className={styles.title}>My Wallet</h2>
          <p className={styles.subtitle}>
            Manage your balance and add funds securely
          </p>
        </div>

        {/* Balance Card */}
        <div className={styles.balanceCard}>
          <div className={styles.balanceLabel}>Current Balance</div>
          <div className={styles.balanceAmount}>₹ {balance}</div>
        </div>

        {/* Messages */}
        {message && <div className={styles.successBox}>{message}</div>}
        {error && <div className={styles.errorBox}>{error}</div>}

        {/* Add Money Card */}
        <div className={styles.addCard}>
          <h3>Add Money</h3>

          <div className={styles.inputWrap}>
            <span className={styles.currency}>₹</span>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            className={styles.addBtn}
            onClick={addMoney}
            disabled={adding}
          >
            {adding ? "Processing..." : "Add Money"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Wallet;