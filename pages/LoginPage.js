import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../api';
import { useRouter } from 'next/router';

const LoginPage = ({ token }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (token) {
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
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <LoginForm onSubmit={onSubmit}/>
    </div>
  );
};

export default LoginPage;
