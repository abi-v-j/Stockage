import React, { useEffect, useState } from "react";
import Styles from "./Viewstock.module.css";
import axios from "axios";

const Viewstock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const itemsPerPage = 10;

  const [editFormData, setEditFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    quantity: "",
    status: "Active"
  });

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = () => {
    setLoading(true);
    setError("");
    axios
      .get("http://127.0.0.1:8000/stocks/")
      .then((res) => {
        setStocks(res.data.stockdata || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load stocks");
        setLoading(false);
        console.error(err);
      });
  };

  const handleEditClick = (stock) => {
    setEditingId(stock.id);
    setEditFormData({
      name: stock.name,
      symbol: stock.symbol,
      price: stock.price,
      quantity: stock.quantity,
      status: stock.status
    });
    setShowEditForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!editFormData.name || !editFormData.symbol || !editFormData.price || !editFormData.quantity) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/editstock/${editingId}/`, editFormData)
      .then((res) => {
        setSuccess("Stock updated successfully!");
        loadStocks();
        resetEditForm();
        setTimeout(() => setSuccess(""), 3000);
      })
      .catch((err) => {
        setError("Failed to update stock");
        console.error(err);
        setTimeout(() => setError(""), 3000);
      });
  };

  const resetEditForm = () => {
    setEditingId(null);
    setShowEditForm(false);
    setEditFormData({
      name: "",
      symbol: "",
      price: "",
      quantity: "",
      status: "Active"
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete stock "${name}"?`)) {
      axios
        .delete(`http://127.0.0.1:8000/deletestock/${id}/`)
        .then(() => {
          setSuccess("Stock deleted successfully!");
          loadStocks();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch((err) => {
          setError("Failed to delete stock");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    }
  };

  // Filter stocks
  const filteredStocks = stocks.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "quantity-high") return b.quantity - a.quantity;
    if (sortBy === "quantity-low") return a.quantity - b.quantity;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStocks = sortedStocks.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={Styles.container}>
      {/* Header Section */}
      <div className={Styles.headerSection}>
        <div className={Styles.titleContainer}>
          <h1 className={Styles.header}>📈 Stock Management</h1>
          <span className={Styles.badge}>{sortedStocks.length} Stocks</span>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className={Styles.errorAlert}>{error}</div>}
      {success && <div className={Styles.successAlert}>{success}</div>}

      {/* Edit Form */}
      {showEditForm && (
        <form className={Styles.editForm} onSubmit={handleEditSubmit}>
          <h3>Edit Stock</h3>
          <div className={Styles.formGrid}>
            <input
              type="text"
              name="name"
              placeholder="Stock Name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              className={Styles.formInput}
            />
            <input
              type="text"
              name="symbol"
              placeholder="Stock Symbol"
              value={editFormData.symbol}
              onChange={handleEditFormChange}
              className={Styles.formInput}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editFormData.price}
              onChange={handleEditFormChange}
              className={Styles.formInput}
              min="0"
              step="0.01"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={editFormData.quantity}
              onChange={handleEditFormChange}
              className={Styles.formInput}
              min="0"
            />
            <select
              name="status"
              value={editFormData.status}
              onChange={handleEditFormChange}
              className={Styles.formInput}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit" className={Styles.submitBtn}>✓ Update Stock</button>
            <button
              type="button"
              className={Styles.cancelBtn}
              onClick={resetEditForm}
            >
              ✕ Cancel
            </button>
          </div>
        </form>
      )}

      {/* Controls */}
      <div className={Styles.controlSection}>
        <input
          type="text"
          placeholder="Search by name, symbol, or status..."
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
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="quantity-high">Quantity (High to Low)</option>
          <option value="quantity-low">Quantity (Low to High)</option>
        </select>

        <button className={Styles.refreshBtn} onClick={loadStocks}>
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={Styles.loadingContainer}>
          <div className={Styles.spinner}></div>
          <p>Loading stocks...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedStocks.length === 0 && (
        <div className={Styles.emptyState}>
          <p>No stocks found</p>
        </div>
      )}

      {/* Table */}
      {!loading && sortedStocks.length > 0 && (
        <>
          <div className={Styles.grid}>
            <div className={Styles.gridHeader}>
              <div className={Styles.colId}>ID</div>
              <div className={Styles.colName}>Stock Name</div>
              <div className={Styles.colSymbol}>Symbol</div>
              <div className={Styles.colPrice}>Price</div>
              <div className={Styles.colQuantity}>Quantity</div>
              <div className={Styles.colStatus}>Status</div>
              <div className={Styles.colAction}>Action</div>
            </div>

            {paginatedStocks.map((s) => (
              <div key={s.id} className={Styles.row}>
                <div className={Styles.colId}>{s.id}</div>
                <div className={Styles.colName}>
                  <span className={Styles.name}>{s.name}</span>
                </div>
                <div className={Styles.colSymbol}>{s.symbol}</div>
                <div className={Styles.colPrice}>
                  <span className={Styles.price}>₹ {s.price}</span>
                </div>
                <div className={Styles.colQuantity}>{s.quantity}</div>

                <div className={Styles.colStatus}>
                  <span
                    className={
                      s.status === "Active" ? Styles.active : Styles.inactive
                    }
                  >
                    {s.status}
                  </span>
                </div>

                <div className={Styles.colAction}>
                  <div className={Styles.actions}>
                    <button
                      className={Styles.edit}
                      onClick={() => handleEditClick(s)}
                    >
                      ✏ Edit
                    </button>
                    <button
                      className={Styles.delete}
                      onClick={() => handleDelete(s.id, s.name)}
                    >
                      🗑 Delete
                    </button>
                  </div>
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
  );
};

export default Viewstock;
