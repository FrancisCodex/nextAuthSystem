import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/LoginPage');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
      <style jsx>{`
        .logout-button {
          font-size: 1.2rem;
          text-decoration: none;
          color: #fff;
          background-color: #333;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }

        .logout-button:hover {
          color: #fff;
          background-color: #cc0000;
        }
      `}</style>
    </button>
  );
};

export default LogoutButton;
