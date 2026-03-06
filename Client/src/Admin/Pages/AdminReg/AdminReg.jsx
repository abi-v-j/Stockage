import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReg = () => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    axios
      .get("http://127.0.0.1:8000/admin/")
      .then((res) => {
        setAdmins(res.data.admindata);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const data = {
      admin_name: adminName,
      admin_email: adminEmail,
      admin_password: adminPassword,
    };

    if (editId === 0) {
      axios
        .post("http://127.0.0.1:8000/admin/", data)
        .then((res) => {
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
          loadAdmins();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`http://127.0.0.1:8000/editadmin/${editId}/`, data)
        .then((res) => {
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
          setEditId(0);
          loadAdmins();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deleteadmin/${id}/`)
      .then((res) => {
        loadAdmins();
      })
      .catch((err) => console.log(err));
  };

  const getEditData = (admin) => {
    setEditId(admin.id);
    setAdminName(admin.admin_name);
    setAdminEmail(admin.admin_email);
    setAdminPassword(admin.admin_password);
  };

  const handleCancel = () => {
    setEditId(0);
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
  };

  return (
    <div>
      <h2>Admin Registration</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Admin Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="email"
          placeholder="Enter Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Enter Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
      </div>

      <br />

      <div>
        <button onClick={handleSubmit}>
          {editId === 0 ? "Save" : "Update"}
        </button>

        {editId !== 0 && (
          <button onClick={handleCancel}>Cancel</button>
        )}
      </div>

      <br />
      <hr />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Admin Password</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.admin_name}</td>
              <td>{admin.admin_email}</td>
              <td>{admin.admin_password}</td>
              <td>
                <button onClick={() => getEditData(admin)}>Edit</button>
                <button onClick={() => handleDelete(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReg;