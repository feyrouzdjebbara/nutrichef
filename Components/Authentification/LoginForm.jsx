"use client"
import React, { useState } from 'react'
import styles from "./form.module.css";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
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
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputstyle}
        /><br />
        <input
          type="submit"
          value="Login"
          onClick={submitForm}
          className={styles.subbutton}
        />
      </form>
    </div>
  )
}
