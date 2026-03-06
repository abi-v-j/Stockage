import React from 'react'
import { useState } from 'react';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  return (
    <div className="page">
         <div className="login-box">
            <div className="label">Email</div>
            <input 
            type="email"
            className="input"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}/>
            <div className="label">Password</div>
            <input
            type="password"
            className="input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button className="btn" onClick={HandleLogin}>
                Login</button>
           </div>


    </div>
  )
}

export default Login