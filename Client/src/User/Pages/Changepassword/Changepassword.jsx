import React, { useState } from "react";
import axios from "axios";

const Changepassword = () => {
  const uid = sessionStorage.getItem("uid");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password must be same");
      return;
    }

    const data = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    axios
      .put(`http://127.0.0.1:8000/userchangepassword/${uid}/`, data)
      .then((res) => {
        alert(res.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Password change failed");
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

      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default Changepassword;