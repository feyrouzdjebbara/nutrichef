"use client"
import styles from "../../styles/form.module.css";
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
      <form className={styles.formstyle} method="POST" action="">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.inputstyle}
        /><br />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={styles.inputstyle}
        /><br />
          <input
          type="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className={styles.inputstyle}
        /><br />
         <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputstyle}
        /><br />
         <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles.inputstyle}
        /><br />
        <input
          type="submit"
          value="Sign Up"
          onClick={submitForm}
          className={styles.subbutton}
        />
      </form>
    </div>
  )
}
