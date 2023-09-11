import React, { useState } from 'react';
import styles from '../../styles/form.module.css';
import axios from 'axios';

export default function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lasrName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); 

  const submitForm = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return; 
    }

    try {
     
      const userData = {
        firstName: firstName,
        lastName: lasrName,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      };

    
      const response = await axios.post('http://localhost:3333/auth/signup', userData);

     
      console.log('Response from the API:', response.data);

     
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setPasswordsMatch(true); 
    } catch (error) {
     
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form className={styles.formstyle} onSubmit={submitForm}>
      <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className={styles.inputstyle}
        /><br />
         <input
          type="text"
          name="lasrName"
          value={lasrName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
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
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
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
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles.inputstyle}
        /><br />
        
        
        {!passwordsMatch && <p className={styles.errormessage}> Passwords do not match.</p>}

        <input
          type="submit"
          value="Sign Up"
          className={styles.subbutton}
        />
      </form>
    </div>
  );
}