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
                        src="/img/foodPlate.png"
                        alt="foodPlate"
                        className={`${styles.aboutImage} ${styles.circularImage}`}
                    />
                </section>
                <section className={styles.aboutSection}>
                    <p className={styles.text}>
                    Welcome to Nutrichef! We are dedicated to helping you achieve your health and nutrition goals effortlessly. With our app, you can easily track your meals, monitor your nutritional intake, and discover delicious recipes. Start your journey to a healthier lifestyle today with Nutrichef!
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
