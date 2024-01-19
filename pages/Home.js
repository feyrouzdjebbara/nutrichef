import React, { useEffect, useState } from 'react';
import Food from './Food';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userId');
      setUser((prevUser) => prevUser || storedUser);

      if (!user && !storedUser) {
        router.push('/login');
      }
    }
  }, [user, router]);

  return (
    <>
      <div>
        <h1>NutriChef</h1>
        <Food />
        <h2>{user}</h2>
      </div>
    </>
  );
}

export default Home;
