
import React from 'react'
import Food from './Food'
import { useRouter } from 'next/router';
const router = useRouter();

function home() {

    useEffect(() => {
       
        if (typeof window !== 'undefined') {
          const user = localStorage.getItem('userId');
    
          if (!user) {
            router.push('/login');
          }
        }
      }, [router]);
        
  

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