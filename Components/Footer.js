import React from 'react'
import styles from "../styles/home.module.css";
import Link from "next/link";
import { FaHome, FaDollarSign, FaBriefcase, FaCalendar, FaInfo, FaUtensils, FaFlask } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
    <Link href="/Home">
      <button className={styles.iconButton}>
        <div><FaHome /></div>
        <div>Home</div>
      </button>
    </Link>
    <Link href="/NutriTest">
      <button className={styles.iconButton}>
      <div><FaFlask /></div>
        <div>NutriTest</div>
      </button>
    </Link>
    <Link href="/recipes">
  <button className={styles.iconButton}>
    <div><FaUtensils /></div>
    <div>Recipes</div>
  </button>
</Link>
    <Link href="/calendar">
      <button className={styles.iconButton}>
        <div><FaCalendar /></div>
        <div>Calendar</div>
      </button>
    </Link>
    <Link href="/about">
      <button className={styles.iconButton}>
        <div><FaInfo /></div>
        <div>About</div>
      </button>
    </Link>
  </footer>
  )
}
