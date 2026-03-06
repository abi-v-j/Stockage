import React, { useEffect, useState } from "react";
import axios from "axios";

const Editprofile = () => {

  const uid = sessionStorage.getItem("uid");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios
      .get(`http://127.0.0.1:8000/userprofile/${uid}/`)
      .then((res) => {
        const data = res.data.userdata[0];

        setName(data.user_name);
        setEmail(data.user_email);
        setContact(data.user_contact);
        setAddress(data.user_address);
      })
      .catch(console.error);
  };

  const handleUpdate = () => {

    const formData = new FormData();

    formData.append("user_name", name);
    formData.append("user_email", email);
    formData.append("user_contact", contact);
    formData.append("user_address", address);

    if (photo) {
      formData.append("user_photo", photo);
    }

    axios
      .put(`http://127.0.0.1:8000/userprofile/${uid}/`, formData)
      .then(() => {
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>

      <br />

      <button onClick={handleUpdate}>
        Update Profile
      </button>

    </div>
  );
};

export default Editprofile;