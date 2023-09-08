
import Link from "next/link"
import LoginForm from "../../../Components/Authentification/LoginForm"
import { Suspense } from "react"
export default async function login() {
    
    const loadingjsx=(<div><h1>loading....</h1></div>)
    


  return (
    <>
     <div className="home" >
    <Link  href="/">
        <h2 >Home</h2>
    </Link>
    </div>
     <div className="login-container">
   
      <h1>Hi there !</h1>
      <h3 className="welcome">Welcome Back!</h3>
    <Suspense fallback={loadingjsx}>
    <LoginForm/>
    </Suspense>
    <h3 className="change">New member?</h3>
    <Link href="/auth/signup">
        <h2>Sign Up</h2>
    </Link>
    </div>
    </>
  )
}
