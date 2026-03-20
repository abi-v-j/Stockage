import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import styles from "./Editprofile.module.css";

const Editprofile = () => {
  const uid = sessionStorage.getItem("uid");
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [oldPhoto, setOldPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!uid) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    loadProfile();
  }, [uid]);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/myprofile/${uid}/`);
      const data = res.data.userdata;

      setUserName(data.user_name || "");
      setUserEmail(data.user_email || "");
      setUserContact(data.user_contact || "");
      setUserAddress(data.user_address || "");
      setOldPhoto(data.user_photo || "");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUserPhoto(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const formData = new FormData();
    formData.append("user_name", userName);
    formData.append("user_email", userEmail);
    formData.append("user_contact", userContact);
    formData.append("user_address", userAddress);

    if (userPhoto) {
      formData.append("user_photo", userPhoto);
    }

    try {
      await axios.post(`http://127.0.0.1:8000/editprofile/${uid}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Profile updated successfully");

      setTimeout(() => {
        navigate("/Userhome/MyProfile");
      }, 900);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (!userName) return "U";
    return userName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateCard}>
          <div className={styles.loader}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <p className={styles.tag}>Account Settings</p>
            <h2 className={styles.title}>Edit Profile</h2>
            <p className={styles.subtitle}>
              Update your personal details and profile photo
            </p>
          </div>
        </div>

        {message && <div className={styles.successBox}>{message}</div>}
        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.topGrid}>
            <div className={styles.photoCard}>
              <div className={styles.photoWrap}>
                {preview ? (
                  <img src={preview} alt="Preview" className={styles.photo} />
                ) : oldPhoto ? (
                  <img
                    src={`http://127.0.0.1:8000${oldPhoto}`}
                    alt="Current"
                    className={styles.photo}
                  />
                ) : (
                  <div className={styles.avatarFallback}>{getInitials()}</div>
                )}
              </div>

              <label className={styles.uploadBtn}>
                Choose New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.fileInput}
                />
              </label>

              <p className={styles.photoHint}>
                JPG, PNG or JPEG image supported
              </p>
            </div>

            <div className={styles.fieldsGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter full name"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter email address"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Contact Number</label>
                <input
                  type="text"
                  value={userContact}
                  onChange={(e) => setUserContact(e.target.value)}
                  required
                  className={styles.input}
                  placeholder="Enter contact number"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Address</label>
                <textarea
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  required
                  className={styles.textarea}
                  placeholder="Enter address"
                  rows="5"
                />
              </div>
            </div>
          </div>

          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate("/Userhome/MyProfile")}
            >
              Cancel
            </button>

            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;