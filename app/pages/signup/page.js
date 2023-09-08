import Link from "next/link"
import SignUpForm from "../../../Components/Authentification/SignUpForm"
import { Suspense } from "react"
import styles from "../../styles/signup.module.css";

export default async function signup() {
    
    const loadingjsx=(<div><h1>loading....</h1></div>)
  return (
    <>
    <div className={styles.home}>
    <Link  href="/">
        <h2 className={styles.title2}>Home</h2>
    </Link>
    </div>
    
     <div className={styles.container}>
    
      <h1 className={styles.title}>Create Account.</h1>
    <Suspense fallback={loadingjsx}>
    <SignUpForm />
    </Suspense>
    <h3 className={styles.title3}>Already a member?</h3>
    <Link href="/pages/login">
        <h2 className={styles.title2}>Log In</h2>
    </Link>
    </div>
    </>
  )
}
