import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin']})

const LoginPage = ({ token }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (token && !router.query.redirected) {
      router.push('/DashboardPage');
    }
  }, [token, router]);

  const onSubmit = async (data) => {
    try {
      const userData = await login(data);
      console.log(userData);
      // TODO: save user data to state or context and redirect to dashboard
      router.push('/DashboardPage');
    } catch (error) {
      setError('Username or password is incorrect');
    }
  };

  return (
    <div className={font.className}>
      {error && <p>{error}</p>}
      <LoginForm onSubmit={onSubmit}/>
    <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', width: '100%' }}>
          <p style={{ margin: '0' }}>© 2023 Your Website. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default LoginPage;
