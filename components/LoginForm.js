import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = ({ onSubmit, loggedIn }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push('/DashboardPage');
    }
  }, [loggedIn, router]);

  return (
    <div className='container'>
      <h1>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} type="password" id="password" required />
      </div>
      <button type="submit">Log in</button>
    </form>
          <div>
            <p>New Here? </p>
            <Link href='/RegistrationPage'>
              Register Here
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

        button {
          border-radius: 15px;
          margin-top: 50px;
          height: 45px;
          background-color: red !important;
          color: white !important;
          font-weight: 200px;
          text-transform: none;
          font-weight: 300;
          font-size: 16px;
          line-height: 28px;
          border: none;
          width: 100%;
        }

        button:hover {
          background-color: #555;
        }

        a {
          display: block;
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default LoginForm;
