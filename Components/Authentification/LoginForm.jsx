"use client"
import React, { useState } from 'react'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const submitForm = (e) => {
      e.preventDefault();
     
    };
  return (
  <div>
      <form method="POST" action="">
     
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        /><br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /><br />
        <input
          type="submit"
          value="Login"
          onClick={submitForm}
          className="login-button"
        />
      </form>
    </div>
  )
}
