import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router';
import { useEffect } from "react"; 
import jwt from 'jsonwebtoken'; 

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const jwtToken = localStorage.getItem('OursiteJWT'); 
    const decodedToken = jwt.decode(jwtToken);
   
    if (!jwtToken) {
      router.push('/login');
    } else {

      console.log(decodedToken);
    }
  }, [router]);




  return (


    <div className={styles.container}>
      <header className={styles.header}>
    
        <div className={styles.count}>
          <div className={styles.periodcount}> 
          <select className={styles.periodselect} value="thisMonth">
               <option value="thisMonth">This Month</option>
               <option value="thisYear">This Month</option>
          </select>
          </div>
          <div className={styles.containerexin}>
              <div className={styles.expencescount}></div>
              <div className={styles.incomecount}></div>
          </div>
        </div>
        
      </header>

      <main className={styles.main}>
      
      <h1>Welcome,!</h1>


      </main>

      <footer className={styles.footer}>
          <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/about">
          <button>Chart</button>
        </Link> 
     
      </footer>
    </div>
  );
}
