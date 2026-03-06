import React, { useState } from "react";
import Styles from "./Pricing.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const initialMarketData = [
  { id: 1, name: "Apple Inc", symbol: "AAPL", price: 185.40, change: 1.2 },
  { id: 2, name: "Tesla", symbol: "TSLA", price: 245.10, change: -0.5 },
  { id: 3, name: "Amazon", symbol: "AMZN", price: 130.20, change: 0.8 },
  { id: 4, name: "Google", symbol: "GOOGL", price: 120.50, change: 1.5 },
  { id: 5, name: "Microsoft", symbol: "MSFT", price: 310.30, change: -0.3 },
  { id: 6, name: "Netflix", symbol: "NFLX", price: 410.90, change: 2.1 },
  { id: 7, name: "Meta", symbol: "META", price: 260.75, change: -1.0 },
  { id: 8, name: "Nvidia", symbol: "NVDA", price: 390.15, change: 0.7 },
  { id: 9, name: "Intel", symbol: "INTC", price: 50.20, change: 1.5 },
  { id: 10, name: "AMD", symbol: "AMD", price: 95.10, change: -0.8 },
  { id: 11, name: "Spotify", symbol: "SPOT", price: 120.15, change: 1.2 },
  { id: 12, name: "Twitter", symbol: "TWTR", price: 45.70, change: -0.6 },
  { id: 13, name: "Alibaba", symbol: "BABA", price: 140.25, change: 0.9 },
  { id: 14, name: "Snap Inc", symbol: "SNAP", price: 75.60, change: -1.1 },
  { id: 15, name: "Paypal", symbol: "PYPL", price: 85.20, change: 0.5 },
  { id: 16, name: "Adobe", symbol: "ADBE", price: 620.50, change: 1.3 },
  { id: 17, name: "Oracle", symbol: "ORCL", price: 80.30, change: -0.2 },
  { id: 18, name: "Salesforce", symbol: "CRM", price: 220.40, change: 0.6 },
  { id: 19, name: "Coinbase", symbol: "COIN", price: 120.20, change: -2.0 },
  { id: 20, name: "Shopify", symbol: "SHOP", price: 145.75, change: 1.7 },
];

const Pricing = () => {
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [markets, setMarkets] = useState(initialMarketData);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleBuy = (market) => {
    const qty = quantities[market.id] || 1;
    alert(
      `Buying ${qty} shares of ${market.name} (${market.symbol}) at $${market.price.toFixed(
        2
      )} each`
    );
  };

  const filteredMarkets = markets.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortByPrice = () => {
    const sorted = [...markets].sort((a, b) => b.price - a.price);
    setMarkets(sorted);
  };

  const sortByName = () => {
    const sorted = [...markets].sort((a, b) => a.name.localeCompare(b.name));
    setMarkets(sorted);
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.heading}>Pricing</h1>

      <div className={Styles.controls}>
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={Styles.searchInput}
        />
        <div className={Styles.sortBtns}>
          <button onClick={sortByPrice} className={Styles.sortBtn}>
            Sort by Price
          </button>
          <button onClick={sortByName} className={Styles.sortBtn}>
            Sort by Name
          </button>
        </div>
      </div>

      <div className={Styles.marketList}>
        {filteredMarkets.map((market) => (
          <div key={market.id} className={Styles.marketCard}>
            <div className={Styles.marketInfo}>
              <h2>{market.name}</h2>
              <p>Symbol: {market.symbol}</p>
              <p>
                Price: ${market.price.toFixed(2)}{" "}
                <span
                  className={
                    market.change >= 0
                      ? Styles.marketUp
                      : Styles.marketDown
                  }
                >
                  {market.change >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  {Math.abs(market.change)}%
                </span>
              </p>
            </div>
            <div className={Styles.marketActions}>
              <input
                type="number"
                min="1"
                value={quantities[market.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(market.id, e.target.value)
                }
                className={Styles.quantityInput}
              />
              <button
                className={Styles.buyBtn}
                onClick={() => handleBuy(market)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing
