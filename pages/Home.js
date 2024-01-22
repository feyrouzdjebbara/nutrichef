import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase/firebase';
import styles from "../styles/home.module.css";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import BmiCalculator from '../Components/BmiCalculator';

function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [gender, setgender] = useState("");
  const [height, setheight] = useState(130);
  const [weight, setweight] = useState(40);
  const [age, setage] = useState(10);
  const [level, setLevel] = useState("level_1");
  const [bmi1, setBMI] = useState();
  const [bmrData, setBmrData] = useState(null);
  const [YourHealthCase, setYourHealthCase] = useState();
  const [goal1, setgoal1] = useState();
  const [calorieNedded, setcalorieNedded] = useState();
 
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

            switch (userInfo.activityLevel) {
              case ("sedentary"): setLevel("level_2");break;
              case ("lightlyActive"): setLevel("level_3");break;
              case ("moderatelyActive"): setLevel("level_4");break;
              case ("veryActive"): setLevel("level_5");break;
              case ("extremelyActive"): setLevel("level_6");break;



            }

                //BMI

      const url2 = `https://fitness-calculator.p.rapidapi.com/bmi?age=${age}&weight=${weight}&height=${height}`;
      const options2 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e539631010msh3b36bd853ea6e5fp1c0407jsn8356fd7e0557',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url2, options2);
        const result = await response.text();

        const resultObject = JSON.parse(result);
        console.log("gggg", resultObject.data.bmi);
        setBMI(resultObject);
        setYourHealthCase(resultObject.data.health)
        {
          switch (YourHealthCase) {
            case ("Severe Thinness"): setgoal1('Extreme weight gain');break;
            case ("Moderate Thinness"): setgoal1('Weight gain');break;
            case ("Mild Thinness"): setgoal1('Mild weight gain');break;
            case ("Normal"): setgoal1('maintain weight');break;
            case ("Normal"): setgoal1('maintain weight');break;
            case ("Overweight"): setgoal1('Mild weight loss');break;
            case ("Obese Class I"): setgoal1('Weight loss');break;
            case ("Obese Class II"): setgoal1('Extreme weight loss');break;
            case ("Obese Class III"): setgoal1('Extreme weight loss');break;

          }
          console.error(goal1);
        }
      } catch (error) {
        console.error(error);
      }
   

      //
     
      const url = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activitylevel=${level}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'e539631010msh3b36bd853ea6e5fp1c0407jsn8356fd7e0557',
          'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const resultObject = JSON.parse(result);


        setBmrData(resultObject);

        console.log(resultObject);
        
        if(goal1 === "maintain weight"){
          const c=resultObject.data.goals["maintain weight"]
          console.log("goal1",goal1);
          console.log("c",c);
          setcalorieNedded(c);
        }else{
          const c=resultObject.data.goals[goal1].calory;
          console.log("goal1",goal1);
          console.log("c",c);
          setcalorieNedded(c);
        }

      } catch (error) {
        console.error(error);
      }

      
          }
        







   
        }
      }
    };
  
      fetchData();
   
  

  }, [userInfo]);


 


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
          {userInfo &&
            <div>
              <h3> your weight is:{userInfo.weight}</h3>

              <h3> your height is:{userInfo.height}</h3>
              <h3> your age is: {userInfo.age}</h3>
              <h3> your gender is: {userInfo.gender}</h3>
            </div>}

         <BmiCalculator 
          bmi1={bmi1}
          goal1={goal1}
          calorieNedded={calorieNedded}
         />




          
             
         



        </main>



        <Footer />
      </div>
    </>
  );
}

export default Home;
