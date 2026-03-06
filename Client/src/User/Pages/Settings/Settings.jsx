import React, { useState } from "react";
import Styles from "./Settings.module.css";

const Settings = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    theme: "dark",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved Settings:", form);
    alert("Settings saved successfully");
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <div className={Styles.title}>Settings</div>

        {/* Profile Section */}
        <div className={Styles.section}>
          <div className={Styles.sectionTitle}>Profile</div>

          <div className={Styles.row}>
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className={Styles.input}
            />
          </div>

          <div className={Styles.row}>
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={Styles.input}
            />
          </div>
        </div>

        {/* Preferences */}
        <div className={Styles.section}>
          <div className={Styles.sectionTitle}>Preferences</div>

          <div className={Styles.row}>
            <label>Theme</label>
            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className={Styles.input}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className={Styles.switchRow}>
            <label>Enable Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              checked={form.notifications}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className={Styles.saveBtn} onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
