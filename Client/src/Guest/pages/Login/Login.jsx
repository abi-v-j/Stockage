import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/Login/", { email, password })
      .then((res) => {
        const { role, id,  message } = res.data;

        alert(message);

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
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Login</h3>

      <table border="1" cellPadding="8">
        <tbody>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2" align="center">
              <button onClick={handleLogin}>Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;