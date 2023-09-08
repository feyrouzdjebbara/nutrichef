
import Link from "next/link"
import LoginForm from "../../../Components/Authentification/LoginForm"
import styles from "../../styles/login.module.css";
import { Suspense } from "react"
export default async function login() {
    
    const loadingjsx=(<div><h1>loading....</h1></div>)
    


  return (
    <>
     <div className={styles.home}>
    <Link  href="/">
        <h2 className={styles.title2}>Home</h2>
    </Link>
    </div>
     <div className={styles.container}>
   
      <h1 className={styles.title}>Hi there !</h1>
      <h3 className={styles.welcome}>Welcome Back!</h3>
    <Suspense fallback={loadingjsx}>
    <LoginForm/>
    </Suspense>
    <h3 className={styles.title3}>New member?</h3>
    <Link href="/pages/signup">
        <h2 className={styles.title2}>Sign Up</h2>
    </Link>
    </div>
    </>
  )
}
