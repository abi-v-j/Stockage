import React, { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  const uid = sessionStorage.getItem("uid");

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = () => {
    axios
      .get(`http://127.0.0.1:8000/userwallet/${uid}/`)
      .then((res) => {
        setBalance(res.data.wallet_balance);
      })
      .catch(console.error);
  };

  const addMoney = () => {
    axios
      .post(`http://127.0.0.1:8000/addmoney/${uid}/`, {
        amount: amount,
      })
      .then((res) => {
        alert("Money Added");
        setAmount("");
        loadWallet();
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>User Wallet</h2>

      <h3>Balance: ₹{balance}</h3>

      <br />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addMoney}>Add Money</button>
    </div>
  );
};

export default Wallet;