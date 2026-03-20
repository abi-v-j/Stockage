import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import styles from "./MyProfile.module.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const uid = sessionStorage.getItem("uid");

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
      setUser(res.data.userdata);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!user?.user_name) return "U";
    return user.user_name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loaderCard}>
          <div className={styles.loader}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.messageCard}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.messageCard}>
          <h3>No Data</h3>
          <p>No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.profileCard}>
        <div className={styles.topSection}>
          <div className={styles.profileImageWrap}>
            {user.user_photo ? (
              <img
                src={`http://127.0.0.1:8000${user.user_photo}`}
                alt="User"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.avatarFallback}>{getInitials()}</div>
            )}
          </div>

          <div className={styles.topContent}>
            <p className={styles.smallTag}>My Account</p>
            <h2 className={styles.title}>{user.user_name}</h2>
            <p className={styles.subtitle}>{user.user_email}</p>

            <div className={styles.buttonGroup}>
              <button
                className={styles.editBtn}
                onClick={() => navigate("/Userhome/Editprofile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <span className={styles.label}>Full Name</span>
            <span className={styles.value}>{user.user_name || "N/A"}</span>
          </div>

          <div className={styles.infoBox}>
            <span className={styles.label}>Email Address</span>
            <span className={styles.value}>{user.user_email || "N/A"}</span>
          </div>

          <div className={styles.infoBox}>
            <span className={styles.label}>Contact Number</span>
            <span className={styles.value}>{user.user_contact || "N/A"}</span>
          </div>

          <div className={styles.infoBox}>
            <span className={styles.label}>Address</span>
            <span className={styles.value}>{user.user_address || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;