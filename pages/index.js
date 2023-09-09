import Head from 'next/head'
import styles from "../styles/home.module.css";
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Expenses Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <main>
    <div className={styles.homecontainer}>
     <img src="/img/home.svg" alt="Home Illustration" width="400" height="400" />

      <h1 className={styles.greeting}>Your Finances in One Palce!</h1>
      <div className={styles.buttoncontainer}>
      <Link href="/login">
          <button className={styles.loginbutton}>Log In</button>
        </Link>
        <br/>
        <Link href="/signup">
          <button className={styles.signupbutton} >Sign Up</button>
        </Link>
       
      </div>
    </div>
    </main>
</>
  
  )
}

