
import React from 'react'
import Food from './Food'
import { useRouter } from 'next/router';

function home() {
    const router = useRouter();
    const user = localStorage.getItem('userId');
  
    
    if (!user) {
     
     router.push('/login');
     }
        
  

  return (
    <>
    
    <div >
     <h1>NutriChef</h1>
     <Food></Food>
     <h2>{user}</h2>
      </div>
  
</>
  )
}

export default home