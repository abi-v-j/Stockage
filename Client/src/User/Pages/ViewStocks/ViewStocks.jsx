import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const ViewStocks = () => {
  const { id } = useParams();
  const uid = sessionStorage.getItem("uid");

  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = () => {
    axios
      .get(`http://127.0.0.1:8000/userviewstocks/${id}/`)
      .then((res) => {
        setStockList(res.data.stockdata);
      })
      .catch(console.error);
  };

  const buyStock = (sid) => {
    const quantity = prompt("Enter Quantity");

    if (!quantity) return;

    axios
      .post(`http://127.0.0.1:8000/placeorder/`, {
        user_id: uid,
        stock_id: sid,
        order_type: "buy",
        order_quantity: quantity,
        order_price: 1
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response?.data?.message));
  };

  const sellStock = (sid) => {
    const quantity = prompt("Enter Quantity");

    if (!quantity) return;

    axios
      .post(`http://127.0.0.1:8000/placeorder/`, {
        user_id: uid,
        stock_id: sid,
        order_type: "sell",
        order_quantity: quantity,
        order_price: 1
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response?.data?.message));
  };

  return (
    <div>
      <h2>Company Stocks</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Stock Symbol</th>
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
              <td>{item.stock_symbol}</td>
              <td>{item.stock_name}</td>
              <td>{item.category_id__category_name}</td>
              <td>{item.stock_status === 1 ? "Active" : "Inactive"}</td>

              <td>
                <button onClick={() => buyStock(item.id)}>
                  Buy
                </button>
              </td>

              <td>
                <button onClick={() => sellStock(item.id)}>
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStocks;