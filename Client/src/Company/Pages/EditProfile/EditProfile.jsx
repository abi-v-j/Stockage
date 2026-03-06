import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const cid = sessionStorage.getItem("cid");

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get(`http://127.0.0.1:8000/editcompanyprofile/${cid}/`)
      .then((res) => {
        const data = res.data.companydata[0];
        setCompanyName(data.company_name || "");
        setCompanyEmail(data.company_email || "");
        setCompanyPassword(data.company_password || "");
        setCompanyDetails(data.company_details || "");
      })
      .catch(console.error);
  };

  const handleUpdate = () => {
    const data = {
      company_name: companyName,
      company_email: companyEmail,
      company_password: companyPassword,
      company_details: companyDetails,
    };

    axios
      .put(`http://127.0.0.1:8000/editcompanyprofile/${cid}/`, data)
      .then((res) => {
        alert("Profile Updated Successfully");
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Edit Profile</h2>

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
        <input
          type="email"
          placeholder="Company Email"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Company Password"
          value={companyPassword}
          onChange={(e) => setCompanyPassword(e.target.value)}
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

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditProfile;