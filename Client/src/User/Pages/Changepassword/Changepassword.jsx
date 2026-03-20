import React, { useState } from "react";
import axios from "axios";
import styles from "./Changepassword.module.css";
import { useNavigate } from "react-router";

const Changepassword = () => {
  const uid = sessionStorage.getItem("uid");
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/userchangepassword/${uid}/`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      setMessage(res.data.message || "Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/Userhome/MyProfile");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.tag}>Security</p>
          <h2 className={styles.title}>Change Password</h2>
          <p className={styles.subtitle}>
            Keep your account secure by updating your password
          </p>
        </div>

        {message && <div className={styles.successBox}>{message}</div>}
        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={changePassword} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={styles.input}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate("/Userhome/MyProfile")}
            >
              Cancel
            </button>

            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;