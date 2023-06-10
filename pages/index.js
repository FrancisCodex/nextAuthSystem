import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { useAuthentication } from '@/components/authContext';
import Link from 'next/link';

const inter = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <h1 style={{ fontSize: '24px' }}>HELLO EVERYONE, WELCOME TO MY WEBSITE</h1>
      </div>
      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <h2> Francis Adrian Altesing</h2>
        <h2>IT 18 - GP1</h2>
        <p>This website displays the authentication and API calling</p>
        <p>Register Here</p>
        <Link href="/RegistrationPage">
            <button className="register-button">Register</button>
          </Link>
      </div>
      <style jsx>{`


      .register-button {
        font-size: 1.2rem;
        text-decoration: none;
        color: #fff;
        background-color: #333;
        border: none;
        border-radius: 4px;
        padding: 0.5rem 1rem;
        transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
      }
      .register-button:hover {
        color: #fff;
        background-color: #cc0000;
      }
      `}
      </style>

      <footer style={{ padding: '10px', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ margin: '0' }}>© 2023 Your Website. All rights reserved.</p>
      </footer>
    </div>
  )
}
