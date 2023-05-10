import { useState } from 'react';
import { register } from '../api';
import Link from 'next/link';

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await register(formData);
      setSuccess(true);
      // Redirect to login page or dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      {success && <p>Registration successful! Please log in.</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={handleInputChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" onChange={handleInputChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={handleInputChange} required />
        <button type="submit">Register</button>
      </form>
      <div>
            <p>Already Registered?</p>
            <Link href='/LoginPage'>
                Sign in Here
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
          text-align: left;
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

export default RegisterPage;

//PREVIOUS CODE FOR KEEP SAKES ONLY

// import { useState } from 'react';
// import RegistrationForm from '../components/RegistrationForm';
// import { register } from '../api';

// const RegistrationPage = () => {
//   const [error, setError] = useState(null);

//   const onSubmit = async (data) => {
//     try {
//       const userData = await register(data);
//       console.log(userData);
//       // TODO: save user data to state or context and redirect to dashboard
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Registration</h1>
//       {error && <p>{error}</p>}
//       <RegistrationForm onSubmit={onSubmit} />
//     </div>
//   );
// };

// export default RegistrationPage;
