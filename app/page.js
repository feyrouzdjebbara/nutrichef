
import Image from 'next/image'
import Link from 'next/link'
import styles from "./styles/home.module.css";
export default function Home() {
  
  return (
    <div className={styles.homecontainer}>
     <img src="/img/home.svg" alt="Home Illustration" width="400" height="400" />

      <h1 className={styles.greeting}>Your Finances in One Palce!</h1>
      <div className={styles.buttoncontainer}>
      <Link href="/pages/login">
          <button className={styles.loginbutton}>Log In</button>
        </Link>
        <br/>
        <Link href="/pages/signup">
          <button className={styles.signupbutton} >Sign Up</button>
        </Link>
       
      </div>
    </div>

  
  )
}
