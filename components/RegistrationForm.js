import React from 'react';
import { useForm } from 'react-hook-form';

const RegistrationForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className='container'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} type="password" id="password" required />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input {...register('confirmPassword')} type="password" id="confirmPassword" required />
      </div>
      <button type="submit">Register</button>
    </form>
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
};

export default RegistrationForm;
