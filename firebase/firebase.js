import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB32MUoIBo-heu0OO2Blq0V2451w2HtwrA",
  authDomain: "nutrichef-3620b.firebaseapp.com",
  projectId: "nutrichef-3620b",
  storageBucket: "nutrichef-3620b.appspot.com",
  messagingSenderId: "310904161794",
  appId: "1:310904161794:web:5a6f385de53a0e383e491b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth service for the default app
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
