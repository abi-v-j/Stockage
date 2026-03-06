import React, { useEffect, useState } from 'react'
import Styles from './Addstock.module.css'
import axios from 'axios'

const Addstock = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    stockprice: "",
    stockvolume: "",
    datetime: ""
  });

  // Load stock prices on mount
  useEffect(() => {
    loadStockPrices();
  }, []);

  const loadStockPrices = () => {
    setLoading(true);
    setError("");
    axios.get('http://127.0.0.1:8000/stockprice/')
      .then(res => {
        setStockPrices(res.data.stockpricedata || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load stock prices");
        setLoading(false);
        console.error(err);
      });
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.stockprice || !formData.stockvolume || !formData.datetime) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const payload = {
      stockprice: parseInt(formData.stockprice),
      stockvolume: parseInt(formData.stockvolume),
      datetime: formData.datetime
    };

    if (editingId) {
      // Update stock price
      axios.put(`http://127.0.0.1:8000/editstockprice/${editingId}/`, payload)
        .then(res => {
          setSuccess("Stock price updated successfully!");
          loadStockPrices();
          resetForm();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => {
          setError("Failed to update stock price");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    } else {
      // Add new stock price
      axios.post('http://127.0.0.1:8000/stockprice/', payload)
        .then(res => {
          setSuccess("Stock price added successfully!");
          loadStockPrices();
          resetForm();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => {
          setError("Failed to add stock price");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    }
  }

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      stockprice: item.stock_price,
      stockvolume: item.stockvolume,
      datetime: item.stock_date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleDelete = (id, price) => {
    if (window.confirm(`Delete stock price $${price}?`)) {
      axios.delete(`http://127.0.0.1:8000/deletestockprice/${id}/`)
        .then(res => {
          setSuccess("Stock price deleted successfully!");
          loadStockPrices();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch(err => {
          setError("Failed to delete stock price");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    }
  }

  const resetForm = () => {
    setFormData({ stockprice: "", stockvolume: "", datetime: "" });
    setEditingId(null);
  }

  // Filter stock prices
  const filteredPrices = stockPrices.filter(item =>
    item.stock_price.toString().includes(searchTerm) ||
    item.stock_date.includes(searchTerm) ||
    item.stockvolume.toString().includes(searchTerm)
  );

  // Sort stock prices
  const sortedPrices = [...filteredPrices].sort((a, b) => {
    if (sortBy === "price-high") return b.stock_price - a.stock_price;
    if (sortBy === "price-low") return a.stock_price - b.stock_price;
    if (sortBy === "volume-high") return b.stockvolume - a.stockvolume;
    if (sortBy === "volume-low") return a.stockvolume - b.stockvolume;
    if (sortBy === "date-new") return new Date(b.stock_date) - new Date(a.stock_date);
    if (sortBy === "date-old") return new Date(a.stock_date) - new Date(b.stock_date);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPrices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrices = sortedPrices.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className={Styles.container}>
      {/* Header */}
      <div className={Styles.headerSection}>
        <div className={Styles.titleContainer}>
          <h1 className={Styles.title}>💹 Stock Price Management</h1>
          <span className={Styles.badge}>{sortedPrices.length} Records</span>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className={Styles.errorAlert}>{error}</div>}
      {success && <div className={Styles.successAlert}>{success}</div>}

      {/* Form Section */}
      <form className={Styles.formSection} onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit Stock Price" : "Add New Stock Price"}</h3>
        <div className={Styles.formGrid}>
          <input
            type="number"
            name="stockprice"
            placeholder="Stock Price ($)"
            value={formData.stockprice}
            onChange={handleFormChange}
            className={Styles.input}
            min="1"
            step="0.01"
          />
          <input
            type="number"
            name="stockvolume"
            placeholder="Stock Volume"
            value={formData.stockvolume}
            onChange={handleFormChange}
            className={Styles.input}
            min="1"
          />
          <input
            type="date"
            name="datetime"
            value={formData.datetime}
            onChange={handleFormChange}
            className={Styles.input}
          />
          <button type="submit" className={Styles.submitBtn}>
            {editingId ? "✓ Update" : "+ Add"} Stock Price
          </button>
          {editingId && (
            <button
              type="button"
              className={Styles.cancelBtn}
              onClick={resetForm}
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>

      {/* Controls */}
      <div className={Styles.controlSection}>
        <input
          type="text"
          placeholder="Search by price, volume, or date..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={Styles.searchInput}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={Styles.sortSelect}
        >
          <option value="none">Sort By</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="volume-high">Volume (High to Low)</option>
          <option value="volume-low">Volume (Low to High)</option>
          <option value="date-new">Date (Newest)</option>
          <option value="date-old">Date (Oldest)</option>
        </select>

        <button
          className={Styles.refreshBtn}
          onClick={loadStockPrices}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={Styles.loadingContainer}>
          <div className={Styles.spinner}></div>
          <p>Loading stock prices...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedPrices.length === 0 && (
        <div className={Styles.emptyState}>
          <p>No stock prices found</p>
        </div>
      )}

      {/* Table */}
      {!loading && sortedPrices.length > 0 && (
        <>
          <div className={Styles.tableContainer}>
            <div className={Styles.tableHeader}>
              <div className={Styles.col1}>ID</div>
              <div className={Styles.col2}>Price ($)</div>
              <div className={Styles.col3}>Volume</div>
              <div className={Styles.col4}>Date</div>
              <div className={Styles.col5}>Actions</div>
            </div>

            {paginatedPrices.map((item) => (
              <div key={item.id} className={Styles.tableRow}>
                <div className={Styles.col1}>{item.id}</div>
                <div className={Styles.col2}>
                  <span className={Styles.price}>${item.stock_price}</span>
                </div>
                <div className={Styles.col3}>
                  <span className={Styles.volume}>{item.stockvolume}</span>
                </div>
                <div className={Styles.col4}>{item.stock_date}</div>
                <div className={Styles.col5}>
                  <button
                    className={Styles.editBtn}
                    onClick={() => handleEdit(item)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className={Styles.deleteBtn}
                    onClick={() => handleDelete(item.id, item.stock_price)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={Styles.paginationContainer}>
              <button
                className={Styles.pageBtn}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className={Styles.pageInfo}>
                Page <span>{currentPage}</span> of <span>{totalPages}</span>
              </div>

              <button
                className={Styles.pageBtn}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Addstock