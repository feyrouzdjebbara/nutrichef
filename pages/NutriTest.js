import React, { useEffect, useState } from 'react';
import Food from '../Components/Food';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase/firebase';
import styles from "../styles/home.module.css";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function NutriTest() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState(null);
 
  const getUserInfo = async (userId) => {
    try {
      const q = query(collection(db, 'usersInfo'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        const userDoc = querySnapshot.docs[0];
        const fetchedUserInfo = userDoc.data();
        setUserInfo(fetchedUserInfo);
      } else {
        console.log('User not found:', userId);

      }
    } catch (error) {
      console.error('Error fetching user information:', error.message);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userId');
      setUser((prevUser) => prevUser || storedUser);

      if (!user && !storedUser) {
        router.push('/login');
      } else {
        getUserInfo(user || storedUser);
      }
    }
  }, [user, router]);


  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userId');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  return (
    <>
      <div className={styles.container}>

        <Header 
          userInfo={userInfo}
          handleLogout={handleLogout}
        />

        <main className={styles.main}>

         
        
          <Food />
          

        </main>



        <Footer />
      </div>
    </>
  );
}

export default NutriTest;
