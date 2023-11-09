
import Link from "next/link"
import styles from "../styles/login.module.css";
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; 
import { Suspense, useEffect, useState } from "react"; 

export default function Login() {
  const [loadingjsx, setLoadingjsx] = useState(null); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const response = await axios.post('http://localhost:3333/auth/login', {
        email: email,
        password: password,
      });
    

     if(response.status === 201){
     const jwtToken = response.data.token;
      localStorage.setItem('OursiteJWT', jwtToken);
      router.push('/Home'); 
     }


   
      setEmail('');
      setPassword('');
        
  
     

    } catch (error) {
      console.error('Erreur  :', error);
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
   
      <h1 className={styles.title}>Hi there !</h1>
      <h3 className={styles.welcome}>Welcome Back!</h3>
    <Suspense fallback={loadingjsx}>
            
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
    </Suspense>
    <h3 className={styles.title3}>New member?</h3>
    <Link href="/signup">
        <h2 className={styles.title2}>Sign Up</h2>
    </Link>
    </div>
    </>
  )
}