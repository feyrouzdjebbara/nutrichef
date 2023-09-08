"use client"
import React, { useState } from 'react'

export default function signupform() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
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
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        /><br />
          <input
          type="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        /><br />
         <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /><br />
         <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirm Password"
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
