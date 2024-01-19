import Head from 'next/head'
import Link from 'next/link'
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>NutriChef</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main>
    <div className={styles.homecontainer}>
    <img className={styles.floatingImage} src="/img/foodPlate.png" alt="Home Illustration" width="400" height="400" />
   

      <h1 className={styles.greeting}>Savor Wellness with NutriChef 
      <br />  Where Flavor Meets Nutrition!</h1>
      
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

