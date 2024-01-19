import React, { useEffect, useState } from 'react';
import Food from './Food';
import { useRouter } from 'next/router';
import { db, auth} from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
function Home() {
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
      <div>
        <h1>NutriChef</h1>
        {userInfo && (
          <div>
            <h2>Welcome: {userInfo.username}</h2>
            
          </div>
        )}
        <Food />
        <button onClick={handleLogout}>Logout</button>
        
      </div>
    </>
  );
}

export default Home;
