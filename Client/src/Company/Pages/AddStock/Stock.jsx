import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router'
const Stock = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockName, setStockName] = useState("");
  const [category, setCategory] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [stockList, setStockList] = useState([]);

  const companyId = sessionStorage.getItem("cid");

  useEffect(() => {
    loadCategory();
    loadStock();
  }, []);

  const loadCategory = () => {
    axios
      .get("http://127.0.0.1:8000/category/")
      .then((res) => setCategoryList(res.data.categorydata))
      .catch(console.error);
  };

  const loadStock = () => {
    axios
      .get(`http://127.0.0.1:8000/stock/?company_id=${companyId}`)
      .then((res) => setStockList(res.data.stockdata))
      .catch(console.error);
  };

  const handleSubmit = () => {
    const data = {
      stock_symbol: stockSymbol,
      stock_name: stockName,
      category_id: category,
      company_id: companyId,
    };

    axios
      .post("http://127.0.0.1:8000/stock/", data)
      .then((res) => {
        setStockSymbol("");
        setStockName("");
        setCategory("");
        loadStock();
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deletestock/${id}/`)
      .then((res) => loadStock())
      .catch(console.error);
  };

  return (
    <div>
      <h2>Stock</h2>

      <div>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--Select Category--</option>
          {categoryList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>
      </div>

      <br />

      <button onClick={handleSubmit}>Save</button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Stock Symbol</th>
            <th>Stock Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stockList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.stock_symbol}</td>
              <td>{item.stock_name}</td>
              <td>{item.category_id__category_name}</td>
              <td>{item.stock_status}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <Link to={`/company/stockprice/${item.id}`}>Add Price</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;