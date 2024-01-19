// pages/login.js

import { useState } from 'react';
import { auth } from '../firebase/firebase'; 
import { useRouter } from 'next/router'; 
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
