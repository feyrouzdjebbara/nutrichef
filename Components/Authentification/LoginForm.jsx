import React, { useState } from 'react';
import styles from '../../styles/form.module.css';
import axios from 'axios'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e) => { 
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/auth/login', {
        email: email,
        password: password,
      });

     
      console.log('Response  :', response.data);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erreur  :', error);
    }
  };

  return (
    <div>
      <form className={styles.formstyle} method="POST" >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
  );
}
