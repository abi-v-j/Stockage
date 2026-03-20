import React, { useState, useRef } from "react";
import axios from "axios";
import Styles from "./Companyreg.module.css";

const FileUploadZone = ({ label, description, accept, file, onChange, icon }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onChange(dropped);
  };

  return (
    <div
      className={`${Styles.uploadZone} ${dragging ? Styles.uploadDragging : ""} ${file ? Styles.uploadDone : ""}`}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={Styles.hiddenInput}
        onChange={(e) => onChange(e.target.files[0])}
      />
      <div className={Styles.uploadIcon}>{file ? "✓" : icon}</div>
      <div className={Styles.uploadLabel}>{label}</div>
      <div className={Styles.uploadDesc}>
        {file ? (
          <span className={Styles.uploadFileName}>{file.name}</span>
        ) : (
          description
        )}
      </div>
      {!file && (
        <div className={Styles.uploadHint}>Click or drag & drop</div>
      )}
    </div>
  );
};

const Companyreg = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [proof, setProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isComplete = name && details && proof && photo && license;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("company_name", name);
    formData.append("company_details", details);
    formData.append("company_proof", proof);
    formData.append("company_photo", photo);
    formData.append("company_license", license);

    try {
      await axios.post("http://127.0.0.1:8000/company/", formData);
      setSuccess(true);
      setName("");
      setDetails("");
      setProof(null);
      setPhoto(null);
      setLicense(null);
    } catch (err) {
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={Styles.page}>
        <div className={Styles.successCard}>
          <div className={Styles.successIcon}>✓</div>
          <h2 className={Styles.successTitle}>Company Registered!</h2>
          <p className={Styles.successSub}>Your application is under review. We'll notify you within 24–48 hours.</p>
          <button className={Styles.successBtn} onClick={() => setSuccess(false)}>
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.page}>
      {/* Background glow */}
      <div className={Styles.bgGlow} />

      <div className={Styles.container}>
        {/* Header */}
        <div className={Styles.header}>
          <div className={Styles.headerBadge}>
            <span className={Styles.badgeDot} />
            Company Onboarding
          </div>
          <h1 className={Styles.title}>Register Your Company</h1>
          <p className={Styles.subtitle}>
            Complete all fields to list your company on the platform and gain access to institutional trading features.
          </p>
        </div>

        {/* Progress bar */}
        <div className={Styles.progress}>
          <div
            className={Styles.progressBar}
            style={{
              width: `${([name, details, proof, photo, license].filter(Boolean).length / 5) * 100}%`
            }}
          />
        </div>
        <div className={Styles.progressLabel}>
          {[name, details, proof, photo, license].filter(Boolean).length} of 5 fields completed
        </div>

        {/* Form */}
        <div className={Styles.form}>

          {/* Company Name */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>
              Company Name
              <span className={Styles.required}>*</span>
            </label>
            <div className={Styles.inputWrap}>
              <span className={Styles.inputIcon}>◈</span>
              <input
                type="text"
                className={Styles.input}
                placeholder="e.g. Acme Capital Ltd."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name && <span className={Styles.inputCheck}>✓</span>}
            </div>
          </div>

          {/* Company Details */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>
              Company Details
              <span className={Styles.required}>*</span>
            </label>
            <div className={Styles.textareaWrap}>
              <textarea
                className={Styles.textarea}
                placeholder="Describe your company's operations, focus areas, and trading strategy..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={5}
              />
              <div className={Styles.charCount}>{details.length} characters</div>
            </div>
          </div>

          {/* File Uploads */}
          <div className={Styles.fieldGroup}>
            <label className={Styles.label}>
              Documents
              <span className={Styles.required}>*</span>
            </label>
            <div className={Styles.uploadsGrid}>
              <FileUploadZone
                label="Company Proof"
                description="Certificate of incorporation or registration"
                accept=".pdf,.jpg,.png"
                file={proof}
                onChange={setProof}
                icon="🏛"
              />
              <FileUploadZone
                label="Company Photo"
                description="Official logo or office photograph"
                accept=".jpg,.jpeg,.png,.webp"
                file={photo}
                onChange={setPhoto}
                icon="📷"
              />
              <FileUploadZone
                label="Trading License"
                description="SEBI / regulatory license document"
                accept=".pdf,.jpg,.png"
                file={license}
                onChange={setLicense}
                icon="📜"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className={Styles.errorBox}>
              <span>⚠</span> {error}
            </div>
          )}

          {/* Submit */}
          <button
            className={`${Styles.submitBtn} ${!isComplete ? Styles.submitDisabled : ""} ${loading ? Styles.submitLoading : ""}`}
            onClick={handleSubmit}
            disabled={!isComplete || loading}
          >
            {loading ? (
              <span className={Styles.spinner} />
            ) : (
              <>
                <span>Submit Registration</span>
                <span className={Styles.submitArrow}>→</span>
              </>
            )}
          </button>

          <p className={Styles.disclaimer}>
            By submitting, you confirm all documents are authentic. Fraudulent submissions will result in permanent account suspension.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companyreg;