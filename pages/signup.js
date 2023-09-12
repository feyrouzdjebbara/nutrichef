import Link from "next/link"
import styles from "../styles/signup.module.css";
import { Suspense, useEffect, useState } from "react"; 
import React  from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default  function signup() {
  const [loadingjsx, setLoadingjsx] = useState(null); 
  const [firstName, setFirstName] = useState('');
  const [lasrName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const router = useRouter();

  useEffect(() => {
  
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingjsx(<div><h1>Loading...</h1></div>);
    };
    fetchData(); 
  }, []); 

 
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
      console.log(response.status)
      if(response.status === 201){

        router.push('/login'); 
       }
  
     
      setFirstName('');
      setLastName('');
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
    <>
    <div className={styles.home}>
    <Link  href="/">
    <img src="/img/back.png" alt="Home" />
    </Link>
    </div>
    
     <div className={styles.container}>
    
      <h1 className={styles.title}>Create Account.</h1>
    <Suspense fallback={loadingjsx}>
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
    </Suspense>
    <h3 className={styles.title3}>Already a member?</h3>
    <Link href="/login">
        <h2 className={styles.title2}>Log In</h2>
    </Link>
    </div>
    </>
  )
}
