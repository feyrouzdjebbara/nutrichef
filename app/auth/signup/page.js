import Link from "next/link"
import SignUpForm from "../../../Components/Authentification/SignUpForm"
import { Suspense } from "react"

export default async function signup() {
    
    const loadingjsx=(<div><h1>loading....</h1></div>)
  return (
    <>
    <div className="home" >
    <Link  href="/">
        <h2 >Home</h2>
    </Link>
    </div>
    
     <div className="login-container">
    
      <h1>Create Account.</h1>
    <Suspense fallback={loadingjsx}>
    <SignUpForm />
    </Suspense>
    <h3 className="change">Already a member?</h3>
    <Link href="/auth/login">
        <h2>Sign In</h2>
    </Link>
    </div>
    </>
  )
}
