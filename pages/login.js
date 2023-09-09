
import Link from "next/link"
import LoginForm from "../Components/Authentification/LoginForm"
import styles from "../styles/login.module.css";

import { Suspense, useEffect, useState } from "react"; 

export default function Login() {
  const [loadingjsx, setLoadingjsx] = useState(null); 

  useEffect(() => {
  
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoadingjsx(<div><h1>Loading...</h1></div>);
    };
    fetchData(); 
  }, []); 

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
    <LoginForm/>
    </Suspense>
    <h3 className={styles.title3}>New member?</h3>
    <Link href="/signup">
        <h2 className={styles.title2}>Sign Up</h2>
    </Link>
    </div>
    </>
  )
}