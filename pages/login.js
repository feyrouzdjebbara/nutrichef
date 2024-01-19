// pages/login.js

import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';
import styles from "../styles/login.module.css";
import { IoChevronBack } from 'react-icons/io5';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [didEdit,setDidEdit]=useState({
    email:false,
    password:false,
  })
 
const emailIsValid= didEdit.email && !email.includes('@');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);


      const user = userCredential.user;


      localStorage.setItem('userId', user.uid);
      router.push('/Home');

    } catch (error) {
      console.error('Error logging in:', error.message);

      // Set an error message based on the specific error code
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('User not found. Please check your email and password.');
      } else {
        setErrorMessage('Authentication error. Please try again.');
      }
    }

  };

  function handleBlurInput(identifier){
    setDidEdit(prevblur =>({
  ...prevblur,
  [identifier]:true
    }) )
   }
  
   function handleChangeEmail(e){
      setEmail((prevEmail) => e.target.value);
      setDidEdit((prevDidEdit) => true);
    }
    

    

  return (
    <>
     <div className={styles.home}>
        <Link href="/">
        <IoChevronBack size={40} className={styles.iconStyle} />
        </Link>
      </div>
      <div className={styles.container}>

<h1 className={styles.title}>Hi there !</h1>
<h3 className={styles.welcome}>Welcome Back to NutriCHef !</h3>
       
        <form className={styles.formstyle}  onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                value={email}
                onBlur={()=>handleBlurInput('email')}
                onChange={handleChangeEmail}
                placeholder="Email"
                className={styles.inputstyle}
                required
              />
              <div className={styles.errormessage} >{emailIsValid && <p >Please enter a valid email adress</p>}</div>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={styles.inputstyle}
                required
                minLength={6}
              /><br />
                <div className={styles.errormessage} >{errorMessage && <p>{errorMessage}</p>}</div>
              <br />
              <button
                type="submit"
                className={styles.subbutton}
              >Login</button>
              
            </form>
            
        
            <h3 className={styles.title3}>New member?</h3>
        <Link href="/signup" className={styles.title2}>
          Sign Up
        </Link>

      </div>
    </>
  );
};

export default Login;
