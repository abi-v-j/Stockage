import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {

  const cid = sessionStorage.getItem("cid");

  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get(`http://127.0.0.1:8000/companyprofile/${cid}/`)
      .then((res) => {
        const data = res.data.companydata[0];
        setCompanyName(data.company_name);
        setCompanyDetails(data.company_details);
      })
      .catch(console.error);
  };

  const handleUpdate = () => {

    const data = {
      company_name: companyName,
      company_details: companyDetails,
    };

    axios
      .put(`http://127.0.0.1:8000/companyprofile/${cid}/`, data)
      .then(() => {
        alert("Profile Updated");
      })
      .catch(console.error);
  };

  return (
    <div>

      <h2>My Profile</h2>

      <div>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <textarea
          placeholder="Company Details"
          value={companyDetails}
          onChange={(e) => setCompanyDetails(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleUpdate}>
        Update
      </button>

    </div>
  );
};

export default MyProfile;