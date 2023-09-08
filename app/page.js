
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  
  return (
    <div className="home-container">
     <img src="/img/home.svg" alt="Home Illustration" width="400" height="400" />

      <h1 className="greeting">Your Finances in One Palce!</h1>
      <div className="button-container">
      <Link href="/auth/login">
          <button className="login-button">Log In</button>
        </Link>
        <br/>
        <Link href="/auth/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
       
      </div>
    </div>

  
  )
}
