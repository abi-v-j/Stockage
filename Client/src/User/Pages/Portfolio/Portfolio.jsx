import React, { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = () => {

  const uid = sessionStorage.getItem("uid");

  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = () => {
    axios
      .get(`http://127.0.0.1:8000/userportfolio/${uid}/`)
      .then((res) => {
        setPortfolio(res.data.portfolio);
      })
      .catch(console.error);
  };

  return (
    <div>

      <h2>User Portfolio</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Sl No</th>
            <th>Stock</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Avg Price</th>
            <th>Current Price</th>
            <th>Investment</th>
            <th>Current Value</th>
            <th>Profit / Loss</th>
          </tr>
        </thead>

        <tbody>

          {portfolio.map((item, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{item.stock_name}</td>

              <td>{item.stock_symbol}</td>

              <td>{item.quantity}</td>

              <td>₹{item.avg_price}</td>

              <td>₹{item.current_price}</td>

              <td>₹{item.investment}</td>

              <td>₹{item.current_value}</td>

              <td>
                {item.profit_loss >= 0
                  ? `+₹${item.profit_loss}`
                  : `-₹${Math.abs(item.profit_loss)}`
                }
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Portfolio;