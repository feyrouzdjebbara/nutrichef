import Link from "next/link"
import SignUpForm from "../Components/Authentification/SignUpForm"
import styles from "../styles/signup.module.css";
import { Suspense, useEffect, useState } from "react"; 


export default  function signup() {
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
    
      <h1 className={styles.title}>Create Account.</h1>
    <Suspense fallback={loadingjsx}>
    <SignUpForm />
    </Suspense>
    <h3 className={styles.title3}>Already a member?</h3>
    <Link href="/login">
        <h2 className={styles.title2}>Log In</h2>
    </Link>
    </div>
    </>
  )
}
