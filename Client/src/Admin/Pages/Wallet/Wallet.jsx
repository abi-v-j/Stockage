import React, { useEffect, useState } from "react";
import Styles from "./Wallet.module.css";
import axios from "axios";

const Wallet = () => {
  const [wallets, setWallets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    user_id: "",
    walletbalance: ""
  });

  // Load wallets and users on mount
  useEffect(() => {
    loadWallets();
    loadUsers();
  }, []);

  const loadWallets = () => {
    setLoading(true);
    setError("");
    axios
      .get("http://127.0.0.1:8000/wallet/")
      .then((res) => {
        setWallets(res.data.walletdata || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load wallets");
        setLoading(false);
        console.error(err);
      });
  };

  const loadUsers = () => {
    axios
      .get("http://127.0.0.1:8000/users/")
      .then((res) => {
        setUsers(res.data.userdata || []);
      })
      .catch((err) => {
        console.error("Failed to load users", err);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.user_id || !formData.walletbalance) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const payload = {
      user_id: parseInt(formData.user_id),
      walletbalance: formData.walletbalance
    };

    if (editingId) {
      // Update wallet
      axios
        .put(`http://127.0.0.1:8000/editwallet/${editingId}/`, payload)
        .then((res) => {
          setSuccess("Wallet updated successfully!");
          loadWallets();
          resetForm();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch((err) => {
          setError("Failed to update wallet");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    } else {
      // Add new wallet
      axios
        .post("http://127.0.0.1:8000/wallet/", payload)
        .then((res) => {
          setSuccess("Wallet added successfully!");
          loadWallets();
          resetForm();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch((err) => {
          setError("Failed to add wallet");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    }
  };

  const handleEdit = (wallet) => {
    setEditingId(wallet.id);
    setFormData({
      user_id: wallet.user_id,
      walletbalance: wallet.walletbalance
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id, userId) => {
    const userName = users.find(u => u.id === userId)?.user_name || "User";
    if (window.confirm(`Delete wallet for ${userName}?`)) {
      axios
        .delete(`http://127.0.0.1:8000/deletewallet/${id}/`)
        .then((res) => {
          setSuccess("Wallet deleted successfully!");
          loadWallets();
          setTimeout(() => setSuccess(""), 3000);
        })
        .catch((err) => {
          setError("Failed to delete wallet");
          console.error(err);
          setTimeout(() => setError(""), 3000);
        });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ user_id: "", walletbalance: "" });
  };

  // Get user name by ID
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.user_name : "Unknown User";
  };

  // Filter wallets
  const filteredWallets = wallets.filter((w) =>
    getUserName(w.user_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.walletbalance.toString().includes(searchTerm)
  );

  // Sort wallets
  const sortedWallets = [...filteredWallets].sort((a, b) => {
    if (sortBy === "user-asc") return getUserName(a.user_id).localeCompare(getUserName(b.user_id));
    if (sortBy === "user-desc") return getUserName(b.user_id).localeCompare(getUserName(a.user_id));
    if (sortBy === "balance-high") return parseFloat(b.walletbalance) - parseFloat(a.walletbalance);
    if (sortBy === "balance-low") return parseFloat(a.walletbalance) - parseFloat(b.walletbalance);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedWallets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWallets = sortedWallets.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Calculate total balance
  const totalBalance = wallets.reduce((sum, w) => sum + parseFloat(w.walletbalance || 0), 0);

  return (
    <div className={Styles.container}>
      {/* Header */}
      <div className={Styles.headerSection}>
        <div className={Styles.titleContainer}>
          <h1 className={Styles.title}>💰 Wallet Management</h1>
          <span className={Styles.badge}>{sortedWallets.length} Wallets</span>
        </div>
      </div>

      {/* Summary Card */}
      <div className={Styles.summaryCard}>
        <div className={Styles.summaryItem}>
          <p>Total Wallets</p>
          <h2>{sortedWallets.length}</h2>
        </div>
        <div className={Styles.summaryItem}>
          <p>Total Balance</p>
          <h2>₹ {totalBalance.toFixed(2)}</h2>
        </div>
        <div className={Styles.summaryItem}>
          <p>Active Users</p>
          <h2>{new Set(wallets.map(w => w.user_id)).size}</h2>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className={Styles.errorAlert}>{error}</div>}
      {success && <div className={Styles.successAlert}>{success}</div>}

      {/* Form Section */}
      {showForm && (
        <form className={Styles.formSection} onSubmit={handleAddOrUpdate}>
          <h3>{editingId ? "Edit Wallet" : "Add New Wallet"}</h3>
          <div className={Styles.formGrid}>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleFormChange}
              className={Styles.input}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.user_name} (ID: {user.id})
                </option>
              ))}
            </select>
            <input
              type="number"
              name="walletbalance"
              placeholder="Wallet Balance"
              value={formData.walletbalance}
              onChange={handleFormChange}
              className={Styles.input}
              min="0"
              step="0.01"
            />
            <button type="submit" className={Styles.submitBtn}>
              {editingId ? "✓ Update" : "+ Add"} Wallet
            </button>
            {editingId && (
              <button type="button" className={Styles.cancelBtn} onClick={resetForm}>
                ✕ Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Controls */}
      <div className={Styles.controlSection}>
        <input
          type="text"
          placeholder="Search by user name or balance..."
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
          <option value="user-asc">User (A-Z)</option>
          <option value="user-desc">User (Z-A)</option>
          <option value="balance-high">Balance (High to Low)</option>
          <option value="balance-low">Balance (Low to High)</option>
        </select>

        <button
          className={Styles.addBtn}
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
        >
          {showForm ? "✕ Close Form" : "+ Add Wallet"}
        </button>

        <button className={Styles.refreshBtn} onClick={loadWallets}>
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={Styles.loadingContainer}>
          <div className={Styles.spinner}></div>
          <p>Loading wallets...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedWallets.length === 0 && (
        <div className={Styles.emptyState}>
          <p>No wallets found</p>
        </div>
      )}

      {/* Table */}
      {!loading && sortedWallets.length > 0 && (
        <>
          <div className={Styles.tableContainer}>
            <div className={Styles.tableHeader}>
              <div className={Styles.col1}>ID</div>
              <div className={Styles.col2}>User Name</div>
              <div className={Styles.col3}>User ID</div>
              <div className={Styles.col4}>Wallet Balance</div>
              <div className={Styles.col5}>Actions</div>
            </div>

            {paginatedWallets.map((wallet) => (
              <div key={wallet.id} className={Styles.tableRow}>
                <div className={Styles.col1}>{wallet.id}</div>
                <div className={Styles.col2}>
                  <span className={Styles.userName}>{getUserName(wallet.user_id)}</span>
                </div>
                <div className={Styles.col3}>{wallet.user_id}</div>
                <div className={Styles.col4}>
                  <span className={Styles.balance}>₹ {wallet.walletbalance}</span>
                </div>
                <div className={Styles.col5}>
                  <button
                    className={Styles.editBtn}
                    onClick={() => handleEdit(wallet)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className={Styles.deleteBtn}
                    onClick={() => handleDelete(wallet.id, wallet.user_id)}
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
  );
};

export default Wallet;
