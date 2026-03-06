import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './Accounts.module.css';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_contact: '',
    user_password: '',
    role: 'User',
    status: 'Active'
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Activity states
  const [activityView, setActivityView] = useState(null);
  const [accountActivity, setAccountActivity] = useState([]);

  // Load accounts on mount
  useEffect(() => {
    loadAccounts();
  }, []);

  // Load accounts from backend
  const loadAccounts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://127.0.0.1:8000/users/');
      const allUsers = response.data.userdata || response.data || [];
      
      // Enrich user data with additional properties if needed
      const enrichedUsers = allUsers.map(user => ({
        ...user,
        role: user.role || 'User',
        status: user.status || 'Active',
        createdDate: user.created_date || new Date().toISOString().split('T')[0],
        lastLogin: user.last_login || 'Never'
      }));
      
      setAccounts(enrichedUsers);
      setUsers(enrichedUsers);
    } catch (err) {
      setError('Failed to load accounts: ' + err.message);
      console.error(err);
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or update account
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.user_name || !formData.user_email) {
      setError('Name and email are required');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        // Update existing account
        await axios.put(`http://127.0.0.1:8000/users/${editingId}/`, formData);
        setSuccess('Account updated successfully!');
        setEditingId(null);
      } else {
        // Add new account
        if (!formData.user_password) {
          setError('Password is required for new accounts');
          setTimeout(() => setError(''), 3000);
          setLoading(false);
          return;
        }
        await axios.post('http://127.0.0.1:8000/users/', formData);
        setSuccess('Account created successfully!');
      }
      
      resetForm();
      loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Operation failed: ' + (err.response?.data?.message || err.message));
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  // Edit account
  const handleEdit = (account) => {
    setFormData({
      user_name: account.user_name,
      user_email: account.user_email,
      user_contact: account.user_contact || '',
      user_password: '',
      role: account.role || 'User',
      status: account.status || 'Active'
    });
    setEditingId(account.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete account
  const handleDelete = (account) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the account "${account.user_name}"?`
    );
    
    if (confirmDelete) {
      deleteAccount(account.id);
    }
  };

  const deleteAccount = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${id}/`);
      setSuccess('Account deleted successfully!');
      loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete account: ' + err.message);
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  // Toggle account status
  const handleToggleStatus = async (account) => {
    const newStatus = account.status === 'Active' ? 'Inactive' : 'Active';
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/users/${account.id}/`, {
        ...account,
        status: newStatus
      });
      setSuccess(`Account ${newStatus === 'Active' ? 'activated' : 'deactivated'}!`);
      loadAccounts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status: ' + err.message);
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  // View activity (simulated)
  const handleViewActivity = (account) => {
    setActivityView(account.id);
    const mockActivity = [
      {
        id: 1,
        action: 'Login',
        timestamp: '2026-02-16 10:30:00',
        ipAddress: '192.168.1.1'
      },
      {
        id: 2,
        action: 'Profile Updated',
        timestamp: '2026-02-15 14:20:00',
        ipAddress: '192.168.1.1'
      },
      {
        id: 3,
        action: 'Password Changed',
        timestamp: '2026-02-14 09:15:00',
        ipAddress: '192.168.1.100'
      },
      {
        id: 4,
        action: 'Login',
        timestamp: '2026-02-13 16:45:00',
        ipAddress: '192.168.1.1'
      },
      {
        id: 5,
        action: 'Role Changed',
        timestamp: '2026-02-12 11:00:00',
        ipAddress: '0.0.0.0'
      }
    ];
    setAccountActivity(mockActivity);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      user_name: '',
      user_email: '',
      user_contact: '',
      user_password: '',
      role: 'User',
      status: 'Active'
    });
    setEditingId(null);
    setShowForm(false);
  };

  // Filter and search logic
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (account.user_contact && account.user_contact.includes(searchTerm));
    
    const matchesRole = filterRole === 'All' || account.role === filterRole;
    const matchesStatus = filterStatus === 'All' || account.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Sort logic
  let sortedAccounts = [...filteredAccounts];
  switch(sortBy) {
    case 'name-asc':
      sortedAccounts.sort((a, b) => a.user_name.localeCompare(b.user_name));
      break;
    case 'name-desc':
      sortedAccounts.sort((a, b) => b.user_name.localeCompare(a.user_name));
      break;
    case 'email-asc':
      sortedAccounts.sort((a, b) => a.user_email.localeCompare(b.user_email));
      break;
    case 'email-desc':
      sortedAccounts.sort((a, b) => b.user_email.localeCompare(a.user_email));
      break;
    case 'role-asc':
      sortedAccounts.sort((a, b) => (a.role || 'User').localeCompare(b.role || 'User'));
      break;
    case 'role-desc':
      sortedAccounts.sort((a, b) => (b.role || 'User').localeCompare(a.role || 'User'));
      break;
    default:
      break;
  }

  // Pagination
  const totalPages = Math.ceil(sortedAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAccounts = sortedAccounts.slice(startIndex, startIndex + itemsPerPage);

  // Export to CSV
  const handleExportCSV = () => {
    if (sortedAccounts.length === 0) {
      setError('No data to export');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Contact', 'Role', 'Status', 'Created Date', 'Last Login'];
    const rows = sortedAccounts.map(account => [
      account.id,
      account.user_name,
      account.user_email,
      account.user_contact || '-',
      account.role || 'User',
      account.status || 'Active',
      account.createdDate,
      account.lastLogin
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `accounts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSuccess('Accounts exported successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className={Styles.container}>
      {/* Header */}
      <div className={Styles.headerSection}>
        <div className={Styles.titleContainer}>
          <h1 className={Styles.title}>Account Management</h1>
          <span className={Styles.badge}>{accounts.length} Accounts</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={Styles.summaryCard}>
        <div className={Styles.summaryItem}>
          <p>Total Accounts</p>
          <h2>{accounts.length}</h2>
        </div>
        <div className={Styles.summaryItem}>
          <p>Active Accounts</p>
          <h2>{accounts.filter(a => a.status === 'Active').length}</h2>
        </div>
        <div className={Styles.summaryItem}>
          <p>Admin Users</p>
          <h2>{accounts.filter(a => a.role === 'Admin').length}</h2>
        </div>
        <div className={Styles.summaryItem}>
          <p>Manager Users</p>
          <h2>{accounts.filter(a => a.role === 'Manager').length}</h2>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className={Styles.errorAlert}>{error}</div>}
      {success && <div className={Styles.successAlert}>{success}</div>}

      {/* Add/Edit Account Form */}
      {showForm && (
        <div className={Styles.formSection}>
          <div className={Styles.formHeader}>
            <h3>{editingId ? 'Edit Account' : 'Add New Account'}</h3>
            <button className={Styles.closeBtn} onClick={resetForm}>✕</button>
          </div>
          <form onSubmit={handleAddOrUpdate} className={Styles.form}>
            <div className={Styles.formGrid}>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                value={formData.user_name}
                onChange={handleFormChange}
                className={Styles.input}
                required
              />
              <input
                type="email"
                name="user_email"
                placeholder="Email Address"
                value={formData.user_email}
                onChange={handleFormChange}
                className={Styles.input}
                required
              />
              <input
                type="text"
                name="user_contact"
                placeholder="Contact Number"
                value={formData.user_contact}
                onChange={handleFormChange}
                className={Styles.input}
              />
              {!editingId && (
                <input
                  type="password"
                  name="user_password"
                  placeholder="Password (Required for new)"
                  value={formData.user_password}
                  onChange={handleFormChange}
                  className={Styles.input}
                  required={!editingId}
                />
              )}
              <select
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                className={Styles.input}
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className={Styles.input}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className={Styles.formActions}>
              <button type="submit" className={Styles.submitBtn} disabled={loading}>
                {loading ? 'Processing...' : editingId ? 'Update Account' : 'Create Account'}
              </button>
              <button type="button" className={Styles.cancelBtn} onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Controls */}
      <div className={Styles.controlSection}>
        <input
          type="text"
          placeholder="Search by name, email, or contact..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className={Styles.searchInput}
        />
        <select
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            setCurrentPage(1);
          }}
          className={Styles.sortSelect}
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className={Styles.sortSelect}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={Styles.sortSelect}
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="email-asc">Email A-Z</option>
          <option value="email-desc">Email Z-A</option>
          <option value="role-asc">Role A-Z</option>
          <option value="role-desc">Role Z-A</option>
        </select>
        <button className={Styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : '+ Add Account'}
        </button>
        <button className={Styles.exportBtn} onClick={handleExportCSV}>
          📥 Export CSV
        </button>
        <button className={Styles.refreshBtn} onClick={loadAccounts}>
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className={Styles.loadingContainer}>
          <div className={Styles.spinner}></div>
          <p>Loading accounts...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && paginatedAccounts.length === 0 && (
        <div className={Styles.emptyState}>
          {accounts.length === 0
            ? 'No accounts found. Create your first account!'
            : 'No accounts match your search criteria.'}
        </div>
      )}

      {/* Activity View Modal */}
      {activityView && (
        <div className={Styles.modalOverlay} onClick={() => setActivityView(null)}>
          <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={Styles.modalHeader}>
              <h3>Activity History - {accounts.find(a => a.id === activityView)?.user_name}</h3>
              <button className={Styles.closeBtn} onClick={() => setActivityView(null)}>✕</button>
            </div>
            <div className={Styles.activityList}>
              {accountActivity.map((activity, idx) => (
                <div key={idx} className={Styles.activityItem}>
                  <div className={Styles.activityAction}>{activity.action}</div>
                  <div className={Styles.activityDetails}>
                    <div className={Styles.timestamp}>{activity.timestamp}</div>
                    <div className={Styles.ipAddress}>IP: {activity.ipAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && paginatedAccounts.length > 0 && (
        <div className={Styles.tableContainer}>
          <div className={Styles.tableHeader}>
            <div className={Styles.col1}>ID</div>
            <div className={Styles.col2}>Name</div>
            <div className={Styles.col3}>Email</div>
            <div className={Styles.col4}>Role</div>
            <div className={Styles.col5}>Status</div>
            <div className={Styles.col6}>Actions</div>
          </div>

          {paginatedAccounts.map(account => (
            <div key={account.id} className={Styles.tableRow}>
              <div className={Styles.col1}>{account.id}</div>
              <div className={Styles.col2}>
                <div className={Styles.userName}>{account.user_name}</div>
                <div className={Styles.userContact}>{account.user_contact || '-'}</div>
              </div>
              <div className={Styles.col3}>{account.user_email}</div>
              <div className={Styles.col4}>
                <span className={`${Styles.roleTag} ${Styles[`role${account.role}` || 'roleUser']}`}>
                  {account.role || 'User'}
                </span>
              </div>
              <div className={Styles.col5}>
                <span className={`${Styles.statusTag} ${Styles[`status${account.status}`]}`}>
                  {account.status || 'Active'}
                </span>
              </div>
              <div className={Styles.col6}>
                <button
                  className={Styles.editBtn}
                  onClick={() => handleEdit(account)}
                  title="Edit account"
                >
                  ✎ Edit
                </button>
                <button
                  className={Styles.activityBtn}
                  onClick={() => handleViewActivity(account)}
                  title="View activity"
                >
                  📊 Activity
                </button>
                <button
                  className={`${Styles.toggleBtn} ${account.status === 'Active' ? Styles.deactivate : Styles.activate}`}
                  onClick={() => handleToggleStatus(account)}
                  title={`${account.status === 'Active' ? 'Deactivate' : 'Activate'} account`}
                >
                  {account.status === 'Active' ? '🔒 Deactivate' : '🔓 Activate'}
                </button>
                <button
                  className={Styles.deleteBtn}
                  onClick={() => handleDelete(account)}
                  title="Delete account"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && paginatedAccounts.length > 0 && (
        <div className={Styles.paginationContainer}>
          <button
            className={Styles.pageBtn}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          <span className={Styles.pageInfo}>
            Page <span>{currentPage}</span> of <span>{totalPages}</span>
          </span>
          <button
            className={Styles.pageBtn}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
