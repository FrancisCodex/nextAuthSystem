import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import logoImg from '../images/logofilm.png';

const font = Montserrat({ subsets: ['latin']})


const Navbar = ({ loggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          <div>
            <Image
              src={logoImg}
              alt="Logo"
              width={250}
              height={80}
              className="cursor-pointer object-contain"
            />
          </div>
        </Link>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''} ${font.className}`}>
        {loggedIn && (
          <>
            <li className='text-decoration: none'>
              <Link href="/DashboardPage" legacyBehavior>
                <a href='/DashboardPage'>Dashboard</a>
                </Link>
            </li>
            <li>
              <Link href="/genre/tvshows" legacyBehavior>
                <a href="/tv-shows">TV Shows</a>
                </Link>
            </li>
            <li>
              <Link href="/genre/movies" legacyBehavior>
                <a href="/movies">Movies</a>
                </Link>
            </li>
            <li>
              <Link href="/genre/trending" legacyBehavior>
                <a href="/trending">Trending</a>
                </Link>
            </li>
          </>
        )}
      </ul>
      <div className="logout-button">
        {!loggedIn && (
          <Link href="/LoginPage">
            <button className="login-button">Login</button>
          </Link>
        )}
        {loggedIn && <LogoutButton />}
      </div>
            <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: transparent;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo div {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-right: 1rem;
        }

        .custom-font {
          font-family: ${font.family};
        }

        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          text-decoration: none;
        }

        .nav-links li {
          margin-left: 1rem;
          text-decoration: none;
        }

        .nav-links a {
          font-size: 1.2rem;
          text-decoration: none;
          color: #333;
          transition: color 0.3s ease-in-out;
          text-decoration: none; /* Add this line to remove the underline */
        }

        .nav-links a:hover {
          color: black;
        }

        .logout-button {
          margin-left: auto;
        }

        .login-button {
          font-size: 1.2rem;
          text-decoration: none;
          color: #fff;
          background-color: #333;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }

        .login-button:hover {
          color: #fff;
          background-color: #cc0000;
        }

        @media (max-width: 768px) {
          .menu-icon {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 30px;
            height: 21px;
            cursor: pointer;
          }

          .bar {
            width: 100%;
            height: 3px;
            background-color: #333;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
          }

          .nav-links {
            display: none;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background-color: #f2f2f2;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            padding: 1rem 0;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links li {
            margin-left: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>

    </nav>
  );
};

export default Navbar;
