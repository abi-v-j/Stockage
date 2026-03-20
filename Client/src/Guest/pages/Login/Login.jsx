import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import Styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid = email.trim() && password.trim();

  const handleLogin = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/Login/", { email, password });
      const { role, id, message } = res.data;

      if (role === "admin") {
        sessionStorage.setItem("aid", id);
        navigate("/admin/home");
      } else if (role === "company") {
        sessionStorage.setItem("cid", id);
        navigate("/company/home");
      } else if (role === "user") {
        sessionStorage.setItem("uid", id);
        navigate("/user/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.bgGlow} />
      <div className={Styles.bgGlow2} />

      {/* Grid lines decoration */}
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
          <h1 className={Styles.title}>Welcome back</h1>
          <p className={Styles.subtitle}>Sign in to access your trading dashboard</p>
        </div>

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

        {/* Form */}
        <div className={Styles.form}>

          {/* Email */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>Email Address</label>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon}>
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="email"
                className={Styles.input}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                autoComplete="email"
              />
              {email && (
                <span className={Styles.inputCheck}>
                  <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className={Styles.fieldGroup}>
            <div className={Styles.labelRow}>
              <label className={Styles.label}>Password</label>
              <Link to="/users/forgot-password" className={Styles.forgotLink}>Forgot password?</Link>
            </div>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon}>
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={Styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={Styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            className={`${Styles.submitBtn} ${!isValid || loading ? Styles.submitDisabled : ""}`}
            onClick={handleLogin}
            disabled={!isValid || loading}
          >
            {loading ? (
              <span className={Styles.spinner} />
            ) : (
              <>
                <span>Sign In</span>
                <span className={Styles.arrow}>→</span>
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className={Styles.divider}>
          <span className={Styles.dividerLine} />
          <span className={Styles.dividerText}>New to TickerPro?</span>
          <span className={Styles.dividerLine} />
        </div>

        {/* Register links */}
        <div className={Styles.registerLinks}>
          <Link to="/users/Signup" className={Styles.registerBtn}>
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
              <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Create User Account
          </Link>
          <Link to="/users/Companyreg" className={Styles.registerBtn}>
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
              <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Register a Company
          </Link>
        </div>

        {/* Footer note */}
        <p className={Styles.footerNote}>
          Protected by 256-bit encryption · 99.99% uptime
        </p>
      </div>
    </div>
  );
};

export default Login;