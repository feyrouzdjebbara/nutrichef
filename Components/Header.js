import React from 'react'
import styles from "../styles/home.module.css";
export default function Header({userInfo,handleLogout}) {
  return (
    <header className={styles.header}>
   <div className={styles.headerContainer}>
    {userInfo && (
            <div className={styles.welcome} >
              <h2>Welcome, {userInfo.username} !</h2>

            </div>
            )}

            <button className={styles.logout} 
            onClick={handleLogout}>Logout</button>
    </div>

    </header>
  )
}
