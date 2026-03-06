import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {

  const cid = sessionStorage.getItem("cid");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    axios
      .put(`http://127.0.0.1:8000/companychangepassword/${cid}/`, {
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then((res) => {
        alert(res.data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Error changing password");
      });
  };

  return (
    <div>

      <h2>Change Password</h2>

      <div>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleChangePassword}>
        Change Password
      </button>

    </div>
  );
};

export default ChangePassword;