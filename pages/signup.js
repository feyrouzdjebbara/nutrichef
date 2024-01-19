// pages/signup.js

import { useState } from 'react';
import { auth, db } from '../firebase/firebase'; 
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(''); 
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
 
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;


             await addDoc(collection(db, 'usersInfo'), {
                userId : uid,
                username,
                age,
                gender,
                height,
                weight,
                activityLevel
              });
            

        
      router.push('/login');
    } catch (error) {
        console.error('Error signing up:', error.message, error.code);
        
       
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use. Please choose a different email.');
        } else {
          setErrorMessage('Sign-up error. Please try again.');
        }
      
    }
  };

  return (
    <div>
     <div>
    <Link href="/">
    <button>Home</button>
   </Link>
    </div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label>Gender:</label>
    
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="male">Male</option>
          <option value="female">Female</option>
         
        </select>

        <label>Height:</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />

        <label>Current Weight:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />

        <label>Activity Level:</label>
       
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">Lightly active (light exercise/sports 1-3 days/week)</option>
          <option value="moderatelyActive">Moderately active (moderate exercise/sports 3-5 days/week)</option>
          <option value="veryActive">Very active (hard exercise/sports 6-7 days a week)</option>
          <option value="extremelyActive">Extremely active (very hard exercise/sports & physical job or 2x training)</option>
         
        </select>

       

        <button type="submit">Sign Up</button>
      </form>
      <Link href="login">LogIn</Link>
    </div>
  );
};

export default SignUp;
