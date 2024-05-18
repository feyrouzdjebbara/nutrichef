
import React, { useEffect, useState } from 'react';
import styles from "../styles/home.module.css";
import BmiCalculator from '../Components/BmiCalculator';
import TDEECalculator from './TDEECalculator';
import { useRouter } from 'next/router';
function UserInfo({ userInfo, user, getUserInfo, setUser }) {

  const [gender, setgender] = useState("");
  const [height, setheight] = useState(130);
  const [weight, setweight] = useState(40);
  const [age, setage] = useState(10);
  const [level, setLevel] = useState("");
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('userId');
        setUser((prevUser) => prevUser || storedUser);

        if (!user && !storedUser) {
          router.push('/login');
        } else {
          await getUserInfo(user || storedUser);
          if (userInfo) {
            setgender(userInfo.gender);
            setweight(userInfo.weight);
            setheight(userInfo.height);
            setage(userInfo.age);
            setLevel(userInfo.activityLevel);
            


            }
          }}}




    fetchData();
  }, [userInfo, user, getUserInfo, setUser]);

  return (
    <>
      {userInfo && 
        <>
        <div className={styles.userInfo}>
  <h3 className={styles.title}>Hello, {userInfo.username}</h3>
  {/* <table className={styles.userInfo}>
    <tbody >
      <tr>
        <th>Your weight:</th>
        <td>{userInfo.weight} kg</td>
      </tr>
      <tr>
        <th>Your height:</th>
        <td>{userInfo.height} cm</td>
      </tr>
      <tr>
        <th>Your age:</th>
        <td>{userInfo.age} years</td>
      </tr>
      <tr>
        <th>Your gender:</th>
        <td>{userInfo.gender}</td>
      </tr>
    </tbody>
  </table> */}


           <BmiCalculator
             weight={weight}
               height={height}
           />
            <TDEECalculator 
              weight={weight}
               height={height}
                age={age} 
                gender={gender} 
                activityLevel={level}
            />

</div>
        </>
      }



    </>
  )
}

export default UserInfo