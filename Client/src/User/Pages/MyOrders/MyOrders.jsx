import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const uid = sessionStorage.getItem("uid");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get(`http://127.0.0.1:8000/myorders/${uid}/`)
      .then((res) => setOrders(res.data.orderdata))
      .catch(console.error);
  };

  return (
    <div>
      <h2>My Orders</h2>

      <table border="1" cellPadding="10">
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
              <td>{item.order_stock_id__stock_symbol}</td>
              <td>{item.order_type}</td>
              <td>{item.order_quantity}</td>
              <td>{item.order_price}</td>
              <td>
                {item.order_status === 0
                  ? "Pending"
                  : item.order_status === 1
                  ? "Executed"
                  : "Cancelled"}
              </td>
              <td>{item.order_datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;