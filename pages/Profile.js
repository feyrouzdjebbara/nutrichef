import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase/firebase';
import styles from '../styles/profile.module.css';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [userDocId, setUserDocId] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
 

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem('userId');
      if (storedUser) {
        await getUserInfo(storedUser);
      } else {
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  
  const getUserInfo = async (userId) => {
    try {
      const q = query(collection(db, 'usersInfo'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const fetchedUserInfo = userDoc.data();
        setUserInfo(fetchedUserInfo);
        setUserDocId(userDoc.id);  // Store the document ID
        setUsername(fetchedUserInfo.username);
        setAge(fetchedUserInfo.age);
        setGender(fetchedUserInfo.gender);
        setHeight(fetchedUserInfo.height);
        setWeight(fetchedUserInfo.weight);
        setActivityLevel(fetchedUserInfo.activityLevel);
       
      } else {
        console.log('User not found:', userId);
      }
    } catch (error) {
      console.error('Error fetching user information:', error.message);
    }
  };



  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'usersInfo', userDocId);  // Use the correct document ID

      await updateDoc(userRef, {
        username,
        age: parseInt(age),
        gender,
        height: parseFloat(height),
        weight: parseFloat(weight),
        activityLevel,
       
      });

      alert('Profile updated successfully!');
      router.push('/Home');
    } catch (error) {
      console.error('Error updating profile:', error.message);
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

  const handleProfile = () => {
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
        {userInfo && (
            <form className={styles.formstyle} onSubmit={handleUpdateProfile}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={styles.inputstyle}
                minLength={2}
                required
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className={styles.inputstyle}
                minLength={1}
                required
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.inputstyleselect}
                required
              >
                <option value="" disabled>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height (CM)"
                className={styles.inputstyle}
                minLength={2}
                required
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Current Weight (KG)"
                className={styles.inputstyle}
                minLength={2}
                required
              />
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className={styles.inputstyleselect}
                required
              >
                <option value="" disabled>Activity Level</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightlyActive">Lightly active (light exercise/sports 1-3 days/week)</option>
                <option value="moderatelyActive">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value="veryActive">Very active (hard exercise/sports 6-7 days a week)</option>
                <option value="extremelyActive">Extremely active (very hard exercise/sports & physical job or 2x training)</option>
              </select>
             
              <button type="submit" className={styles.subbutton}>Update Profile</button>
            </form>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
