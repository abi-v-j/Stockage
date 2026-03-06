import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyCompany = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = () => {
    axios
      .get("http://127.0.0.1:8000/pendingcompanies/")
      .then((res) => setCompanies(res.data.data))
      .catch(console.error);
  };

  const updateStatus = (id, status) => {
    axios
      .put(`http://127.0.0.1:8000/verifycompany/${id}/`, { status })
      .then(() => loadPending())
      .catch(console.error);
  };

  return (
    <div>
      <h2>Verify Company</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.company_name}</td>
              <td>{c.company_status}</td>
              <td>
                <button onClick={() => updateStatus(c.id, 1)}>Approve</button>
                <button onClick={() => updateStatus(c.id, 2)}>Reject</button>
                <button onClick={() => updateStatus(c.id, 3)}>Block</button>
              </td>
            </tr>
          ))}

          {companies.length === 0 && (
            <tr>
              <td colSpan="4">No pending companies</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyCompany;