// pages/signup.js
import styles from "../styles/signup.module.css";
import { IoChevronBack } from "react-icons/io5";
import { useState } from 'react';
import { auth, db } from '../firebase/firebase'; 
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsNotMatch, setpasswordsNotMatch] = useState(false); 
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(''); 
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [errorMessage ,setErrorMessage]=useState('')
 
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
              if (userData.password !==userData.confirmPassword){
                setpasswordsNotMatch(true)
                setErrorMessage("Password don't match!");
                return;}

        
     
    } catch (error) {
        console.error('Error signing up:', error.message);
        
       
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use. Please choose a different email.');
        } else {
          setErrorMessage('Sign-up error. Please try again.');
        }
      
    }
  };

  return (
    <>
      <div className={styles.home}>
    <Link  href="/">
    <IoChevronBack size={40} className={styles.iconStyle} />
    </Link>
    </div>
    
     <div className={styles.container}>
    
      <h1 className={styles.title}>Create Account.</h1>
     
      <form className={styles.formstyle}  onSubmit={handleSignUp}>
      
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
         value={age} onChange={(e) => setAge(e.target.value)} 
         placeholder="Age"
          className={styles.inputstyle}
          minLength={1}
         required />

       
        <select 
        value={gender} 
        onChange={(e) => setGender(e.target.value)} 
        className={styles.inputstyleselect}
         placeholder="Gender"
        required>
        <option  value="" disabled >
        Gender
         </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
         
        </select>

        
        <input 
        type="number" 
        value={height} 
        onChange={(e) => setHeight(e.target.value)} 
        placeholder="Height"
          className={styles.inputstyle}
          minLength={2}
        required />

       
        <input 
        type="number" 
        value={weight} 
        onChange={(e) => setWeight(e.target.value)} 
        placeholder="Current Weight"
          className={styles.inputstyle}
          minLength={2}
        required />

       
        <select 
        value={activityLevel} 
        onChange={(e) => setActivityLevel(e.target.value)} 
        className={styles.inputstyleselect}
         placeholder="Activity Level"
        required>
        <option  value="" disabled >
        Activity Level
         </option>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">Lightly active (light exercise/sports 1-3 days/week)</option>
          <option value="moderatelyActive">Moderately active (moderate exercise/sports 3-5 days/week)</option>
          <option value="veryActive">Very active (hard exercise/sports 6-7 days a week)</option>
          <option value="extremelyActive">Extremely active (very hard exercise/sports & physical job or 2x training)</option>
         
        </select>

        <input 
        type="email" 
        value={email} onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
          className={styles.inputstyle}
          minLength={2}
        required />

        <input type="password"
         value={password} 
         onChange={(e) => setPassword(e.target.value)}
         placeholder="Password"
          className={styles.inputstyle}
          minLength={6}
          required />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles.inputstyle}
          required
          minLength={6}
        /><br />
        
        <div className={styles.errormessage} >{passwordsNotMatch && <p >Password don't match</p>}</div>
        <br />
                <div className={styles.errormessage} >{errorMessage && <p>{errorMessage}</p>}</div>
              <br />
        <button
          type="submit"
          className={styles.subbutton}
        >Sign Up</button>
      </form>
    
      <h3 className={styles.title3}>Already a member?</h3>
    <Link href="/login" className={styles.title2}>
        Log In
    </Link>
    </div>
    </>
  );
};

export default SignUp;
