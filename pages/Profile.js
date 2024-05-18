import React, {  useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase/firebase';
import styles from "../styles/home.module.css";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserInfo from '../Components/UserInfo';


function Profile() {
 
  const [userInfo, setUserInfo] = useState();




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

  const handleProfile = async () => {
    router.push('/Profile');
  };

  return (
    <>
      <div className={styles.container}>

      <Header
          userInfo={userInfo}
          handleLogout={handleLogout}
          handleProfile={handleProfile}
        />

        <main className={styles.main}>

        </main>



        <Footer />
      </div>




     
    </>
  );
}

export default Profile
