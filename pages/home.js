import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
    
        <div className={styles.count}>
          <div className={styles.periodcount}> 
            <select className={styles.periodselect}>
              <option selected="" value="this">This Mounth</option>
            </select>
          </div>
          <div className={styles.containerexin}>
              <div className={styles.expencescount}></div>
              <div className={styles.incomecount}></div>
          </div>
        </div>
        
      </header>

      <main className={styles.main}>
      



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
