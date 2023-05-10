import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/LoginPage');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
