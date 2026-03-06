import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const AddStockPrice = () => {
  const { id } = useParams();

  const [stockDate, setStockDate] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [stockVolume, setStockVolume] = useState("");
  const [priceList, setPriceList] = useState([]);

  useEffect(() => {
    loadPrice();
  }, []);

  const loadPrice = () => {
    axios
      .get(`http://127.0.0.1:8000/stockprice/${id}/`)
      .then((res) => setPriceList(res.data.pricedata))
      .catch(console.error);
  };

  const handleSubmit = () => {
    const data = {
      stock_date: stockDate,
      stock_price: stockPrice,
      stock_volume: stockVolume,
    };

    axios
      .post(`http://127.0.0.1:8000/stockprice/${id}/`, data)
      .then((res) => {
        setStockDate("");
        setStockPrice("");
        setStockVolume("");
        loadPrice();
      })
      .catch(console.error);
  };

  const handleDelete = (priceId) => {
    axios
      .delete(`http://127.0.0.1:8000/deletestockprice/${priceId}/`)
      .then(() => loadPrice())
      .catch(console.error);
  };

  return (
    <div>
      <h2>Add Stock Price</h2>

      <div>
        <input
          type="date"
          value={stockDate}
          onChange={(e) => setStockDate(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Stock Price"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Stock Volume"
          value={stockVolume}
          onChange={(e) => setStockVolume(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleSubmit}>Save</button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Stock</th>
            <th>Symbol</th>
            <th>Date</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {priceList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.stock_id__stock_name}</td>
              <td>{item.stock_id__stock_symbol}</td>
              <td>{item.stock_date}</td>
              <td>{item.stock_price}</td>
              <td>{item.stock_volume}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddStockPrice;