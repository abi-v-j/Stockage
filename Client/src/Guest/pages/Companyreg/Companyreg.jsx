import React, { useState } from "react";
import axios from "axios";

const Companyreg = () => {

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [proof, setProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [license, setLicense] = useState(null);

  const handleSubmit = () => {

    const formData = new FormData();

    formData.append("company_name", name);
    formData.append("company_details", details);
    formData.append("company_proof", proof);
    formData.append("company_photo", photo);
    formData.append("company_license", license);

    axios.post("http://127.0.0.1:8000/company/", formData)
      .then(res => {
        alert("Company Registered Successfully");

        setName("");
        setDetails("");
        setProof(null);
        setPhoto(null);
        setLicense(null);
      })
      .catch(console.error);

  };

  return (
    <div>

      <h2>Company Registration</h2>

      <input
        type="text"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Company Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setProof(e.target.files[0])}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) => setLicense(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Register
      </button>

    </div>
  );
};

export default Companyreg;