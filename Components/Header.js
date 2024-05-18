import React from 'react'
import styles from "../styles/home.module.css";
export default function Header({userInfo,handleLogout,handleProfile}) {
  return (
    <header className={styles.header}>
   <div className={styles.headerContainer}>
    {userInfo && (
            
            <button className={styles.welcome} 
            onClick={handleProfile}>Profile</button>
            )}

            <button className={styles.logout} 
            onClick={handleLogout}>Logout</button>
    </div>

    </header>
  )
}
