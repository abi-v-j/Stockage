import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewStocks = () => {
  const { id } = useParams();
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStocks;