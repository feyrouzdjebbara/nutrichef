import React from 'react'
import styles from "../styles/home.module.css";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
    <Link href="/Home">
        <button>Home</button>
      </Link>
        <Link href="/Expenses/my-expenses">
        <button>Expenses</button>
      </Link>
      <Link href="/income">
        <button>Income</button>
      </Link>
      <Link href="/calendar">
        <button>Calendar</button>
      </Link> 
      <Link href="/about">
        <button>About</button>
      </Link> 
   
    </footer>
  )
}
