import Head from 'next/head'
import Food from './Food'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>NutriChef</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <main>
    <div >
     <h1>NutriChef</h1>
   
      </div>
   <Link href="/login">
    <button>login</button>
   </Link>
    </main>
</>
  
  )
}

