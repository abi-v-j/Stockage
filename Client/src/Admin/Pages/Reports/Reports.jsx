import React, { useState } from "react";
import Styles from "./Reports.module.css";
import {
  Button,
  TextField,
  MenuItem,
  LinearProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Reports = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Market");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);

  const reportsData = [
    { id: 1, title: "Monthly Revenue", date: "Jan 31, 2026", status: "Completed" },
    { id: 2, title: "User Growth Analysis", date: "Jan 30, 2026", status: "Pending" },
    { id: 3, title: "Crypto Market Insights", date: "Jan 28, 2026", status: "Completed" },
    { id: 4, title: "Security Audit", date: "Jan 25, 2026", status: "In Progress" },
    { id: 5, title: "Transaction Reports", date: "Jan 20, 2026", status: "Completed" },
  ];

  const filteredReports = reportsData.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const generateAIReport = () => {
    setLoading(true);
    setGenerated(null);

    setTimeout(() => {
      setGenerated({
        title: `${type} AI Report`,
        summary:
          "AI analyzed recent datasets and detected upward momentum with moderate volatility. Risk level is controlled with strong sector rotation.",
        confidence: "92%",
        recommendation: "Consider diversified allocation with trailing stop-loss.",
      });
      setLoading(false);
    }, 1800);
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.heading}>AI Reports Dashboard</h1>

      {/* ===== SUMMARY ===== */}
      <div className={Styles.cards}>
        <div className={Styles.card}><h2>120</h2><p>Total Reports</p></div>
        <div className={Styles.card}><h2>75</h2><p>Completed</p></div>
        <div className={Styles.card}><h2>30</h2><p>Pending</p></div>
        <div className={Styles.card}><h2>AI</h2><p>Assistant Ready</p></div>
      </div>

      {/* ===== AI GENERATOR ===== */}
      <div className={Styles.aiBox}>
        <h2>AI Report Generator</h2>

        <div className={Styles.aiControls}>
          <TextField
            select
            label="Report Type"
            value={type}
            size="small"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="Market">Market</MenuItem>
            <MenuItem value="Portfolio">Portfolio</MenuItem>
            <MenuItem value="Risk">Risk</MenuItem>
            <MenuItem value="Sector">Sector</MenuItem>
          </TextField>

          <Button variant="contained" onClick={generateAIReport}>
            Generate AI Report
          </Button>
        </div>

        {loading && <LinearProgress className={Styles.progress} />}

        {generated && (
          <div className={Styles.aiResult}>
            <h3>{generated.title}</h3>
            <p>{generated.summary}</p>

            <div className={Styles.aiMeta}>
              <span>Confidence: {generated.confidence}</span>
              <span className={Styles.reco}>{generated.recommendation}</span>
            </div>

            <div className={Styles.aiActions}>
              <Button variant="outlined">Download PDF</Button>
              <Button variant="outlined">Export CSV</Button>
            </div>
          </div>
        )}
      </div>

      {/* ===== SEARCH ===== */}
      <div className={Styles.search}>
        <TextField
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className={Styles.tableWrapper}>
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.date}</td>
                <td>
                  <span className={
                    r.status === "Completed"
                      ? Styles.completed
                      : r.status === "Pending"
                      ? Styles.pending
                      : Styles.progressBadge
                  }>
                    {r.status}
                  </span>
                </td>
                <td>
                  <Button size="small" variant="contained">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
