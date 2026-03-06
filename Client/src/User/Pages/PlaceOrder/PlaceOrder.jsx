import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlaceOrder = () => {
  const { stockid } = useParams();
  const uid = sessionStorage.getItem("uid");

  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    const data = {
      user_id: uid,
      stock_id: stockid,
      order_type: orderType,
      order_quantity: quantity,
      order_price: price,
    };

    axios
      .post("http://127.0.0.1:8000/placeorder/", data)
      .then((res) => {
        alert(res.data.message);
        setQuantity("");
        setPrice("");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Order failed");
      });
  };

  return (
    <div>
      <h2>Place Order</h2>

      <div>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      <br />

      <div>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
};

export default PlaceOrder;