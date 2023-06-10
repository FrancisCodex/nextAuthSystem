import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { login } from '../api'; // Import the login function from your api.js file

const LoginForm = ({ loggedIn }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false); // State variable for login error

  useEffect(() => {
    if (loggedIn) {
      router.push('/DashboardPage');
    }
  }, [loggedIn, router]);

  const handleLoginFormSubmit = async (data) => {
    try {
      const user = await login(data); // Call the login function with the form data
      setLoginError(false); // Clear any previous login errors
      console.log('Logged in user:', user); // Log the logged in user (optional)
      router.push('/DashboardPage');
    } catch (error) {
      setLoginError(true); // Set login error to display error message
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register('email')} type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register('password')} type="password" id="password" required />
        </div>
        <button className="login-button" type="submit">Log in</button>
      </form>
      {loginError && <p>Username or password is incorrect</p>} {/* Display login error message */}
      <div>
        <p>New Here? </p>
        <Link href='/RegistrationPage'>
          Register Here
        </Link>
      </div>
      <div>
        <Link href='/'>
          Home page
        </Link>
      </div>
      <style jsx>{`
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 360px;
  position: relative;
  margin: 0 auto;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-align: right;
  width: 100%;
  font-style:
}

input {
  color: black;
  width: 100%;
  background: #f1f1f1;
  border-radius: 15px;
  height: 35px;
  border: none;
  margin-top: 5px;
  padding-left: 15px;
  font-size: 14px;
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
  margin-top: 50px;
}

.login-button:hover {
  color: #fff;
  background-color: #cc0000;
}

a {
  display: block;
  margin-top: 1rem;
  text-align: center;
}
`}</style>
    </div>
  );
};

export default LoginForm;




