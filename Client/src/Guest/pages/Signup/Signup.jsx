import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Styles from "./Signup.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const fields = [name, email, password, contact, address, photo];
  const completed = fields.filter(Boolean).length;
  const isValid = fields.every(Boolean);

  const handlePhoto = (file) => {
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("user_name", name);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("user_contact", contact);
    formData.append("user_address", address);
    formData.append("user_photo", photo);

    try {
      await axios.post("http://127.0.0.1:8000/users/", formData);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={Styles.page}>
        <div className={Styles.bgGlow} />
        <div className={Styles.grid} />
        <div className={Styles.successCard}>
          <div className={Styles.successRing}>
            <div className={Styles.successIcon}>✓</div>
          </div>
          <h2 className={Styles.successTitle}>Account Created!</h2>
          <p className={Styles.successSub}>
            Welcome to TickerPro. Your account is ready — sign in to start trading.
          </p>
          <Link to="/users/login" className={Styles.successBtn}>
            Go to Login <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.bgGlow} />
      <div className={Styles.bgGlow2} />
      <div className={Styles.grid} />

      <div className={Styles.card}>

        {/* Logo */}
        <div className={Styles.logoRow}>
          <div className={Styles.logoIcon}>
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
              <polyline points="2,13 6,7 10,10 15,4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={Styles.logoText}>Ticker<span className={Styles.logoAccent}>Pro</span></span>
        </div>

        {/* Header */}
        <div className={Styles.header}>
          <h1 className={Styles.title}>Create account</h1>
          <p className={Styles.subtitle}>Join 1.2M+ traders. Free forever, no credit card needed.</p>
        </div>

        {/* Progress */}
        <div className={Styles.progressWrap}>
          <div className={Styles.progressBar} style={{ width: `${(completed / 6) * 100}%` }} />
        </div>
        <div className={Styles.progressLabel}>{completed} of 6 fields completed</div>

        {/* Error */}
        {error && (
          <div className={Styles.errorBox}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {error}
          </div>
        )}

        <form className={Styles.form} onSubmit={handleSubmit}>

          {/* Avatar Upload */}
          <div className={Styles.avatarSection}>
            <div
              className={`${Styles.avatarWrap} ${photoPreview ? Styles.avatarFilled : ""}`}
              onClick={() => fileRef.current.click()}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className={Styles.avatarImg} />
              ) : (
                <div className={Styles.avatarPlaceholder}>
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div className={Styles.avatarOverlay}>
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className={Styles.hiddenInput}
              onChange={(e) => handlePhoto(e.target.files[0])}
            />
            <div className={Styles.avatarInfo}>
              <span className={Styles.avatarLabel}>Profile Photo</span>
              <span className={Styles.avatarHint}>
                {photo ? photo.name : "Click to upload · JPG, PNG, WEBP"}
              </span>
            </div>
          </div>

          {/* Two-col row: Name + Contact */}
          <div className={Styles.row}>
            <div className={Styles.fieldGroup}>
              <label className={Styles.label}>Full Name <span className={Styles.req}>*</span></label>
              <div className={Styles.inputWrap}>
                <span className={Styles.inputIcon}>
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className={Styles.input}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                />
                {name && <span className={Styles.check}>✓</span>}
              </div>
            </div>

            <div className={Styles.fieldGroup}>
              <label className={Styles.label}>Contact <span className={Styles.req}>*</span></label>
              <div className={Styles.inputWrap}>
                <span className={Styles.inputIcon}>
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <path d="M3 2h3l1.5 4-2 1.5a9 9 0 003 3L10 8.5l4 1.5v3a1 1 0 01-1 1A13 13 0 012 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  className={Styles.input}
                  placeholder="+91 98765 43210"
                  value={contact}
                  onChange={(e) => { setContact(e.target.value); setError(""); }}
                />
                {contact && <span className={Styles.check}>✓</span>}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>Email Address <span className={Styles.req}>*</span></label>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon}>
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="email"
                className={Styles.input}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
              {email && <span className={Styles.check}>✓</span>}
            </div>
          </div>

          {/* Password */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>Password <span className={Styles.req}>*</span></label>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon}>
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={Styles.input}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
              />
              <button
                type="button"
                className={Styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
            {/* Strength bar */}
            {password && (
              <div className={Styles.strengthRow}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`${Styles.strengthSeg} ${
                      password.length >= i * 3
                        ? password.length >= 10
                          ? Styles.strengthStrong
                          : Styles.strengthMed
                        : ""
                    }`}
                  />
                ))}
                <span className={Styles.strengthLabel}>
                  {password.length < 5 ? "Weak" : password.length < 10 ? "Fair" : "Strong"}
                </span>
              </div>
            )}
          </div>

          {/* Address */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>Address <span className={Styles.req}>*</span></label>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon} style={{ top: 14 }}>
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                  <path d="M8 1.5A4.5 4.5 0 0113 6c0 3-4.5 8.5-5 8.5S3 9 3 6a4.5 4.5 0 015-4.5z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
              <textarea
                className={`${Styles.input} ${Styles.textarea}`}
                placeholder="123 Street, City, State, PIN"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setError(""); }}
                rows={2}
              />
              {address && <span className={Styles.check} style={{ top: 12 }}>✓</span>}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`${Styles.submitBtn} ${!isValid || loading ? Styles.submitDisabled : ""}`}
            disabled={!isValid || loading}
          >
            {loading ? (
              <span className={Styles.spinner} />
            ) : (
              <>
                <span>Create Account</span>
                <span className={Styles.arrow}>→</span>
              </>
            )}
          </button>

          <p className={Styles.terms}>
            By signing up you agree to our{" "}
            <Link to="#" className={Styles.termsLink}>Terms of Service</Link>{" "}
            and{" "}
            <Link to="#" className={Styles.termsLink}>Privacy Policy</Link>.
          </p>
        </form>

        {/* Divider */}
        <div className={Styles.divider}>
          <span className={Styles.dividerLine} />
          <span className={Styles.dividerText}>Already have an account?</span>
          <span className={Styles.dividerLine} />
        </div>

        <Link to="/users/login" className={Styles.loginBtn}>
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 5l4 3-4 3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign In Instead
        </Link>

      </div>
    </div>
  );
};

export default Signup;