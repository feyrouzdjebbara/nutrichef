import React from 'react'
import Footer from '../Components/Footer'
import styles from "../styles/about.module.css";

import SendEmailButton from '../Components/SendEmailButton';
export default function about() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>About Us</h1>
            </header>
            <main>
                <section className={styles.aboutSection}>
                    <img
                        src="/img/wallet.png"
                        alt="wallet.png"
                        className={`${styles.aboutImage} ${styles.circularImage}`}
                    />
                </section>
                <section className={styles.aboutSection}>
                    <p className={styles.text}>
                        Welcome to our Expense Tracker App! We are committed to helping you manage your
                        expenses efficiently. With our app, you can easily track your spending and stay
                        on top of your financial goals. Start taking control of your finances today!
                    </p>

                </section>
                <section className={styles.aboutSection}>
                    <SendEmailButton />
                </section>


            </main>




            <Footer />
        </div>
    )
}
