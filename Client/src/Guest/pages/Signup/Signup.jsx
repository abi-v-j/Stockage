import React, { useState } from "react";
import axios from "axios";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_name", name);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("user_contact", contact);
    formData.append("user_address", address);
    formData.append("user_photo", photo);

    axios.post("http://127.0.0.1:8000/users/", formData)
      .then(res => {
        alert("Signup successful");

        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setAddress("");
        setPhoto(null);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>

      <h2>User Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">Signup</button>

      </form>

    </div>
  );
};

export default Signup;