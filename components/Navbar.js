import Link from 'next/link';

const Navbar = ({ loggedIn }) => {
  const handleLogout = () => {
    // Call your logout function here
  };

  return (
    <nav>
      <div className="logo">
        <Link href="/">
          My Website
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
        {loggedIn ? (
          <>
            <li>
              <Link href="/DashboardPage">
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/LoginPage">
              Login
            </Link>
          </li>
        )}
      </ul>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
        }

        .logo a {
          font-size: 2rem;
          font-weight: bold;
          text-decoration: none;
          color: #333;
        }

        .nav-links {
          display: flex;
          list-style: none;
        }

        .nav-links li {
          margin-left: 2rem;
        }

        .nav-links a {
          font-size: 1.2rem;
          text-decoration: none;
          color: #333;
        }

        button {
          background-color: #333;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.3rem;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
