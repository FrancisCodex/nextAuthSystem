import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
const DashboardPage = ({ token, user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/LoginPage');
    }
  }, [token, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar/>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
