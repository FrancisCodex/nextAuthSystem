import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = 'http://localhost:1337';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/local`, {
      identifier: email,
      password,
    });
    const { jwt: token, user } = response.data;
    setToken(token);
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong');
  }
};

export const register = async ({ username, email, password }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/local/register`, {
        username,
        email,
        password,
        role: "Registered User", // Set the desired role for the new user
      });
      const { jwt: token, user } = response.data;
      setToken(token);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong');
    }
  };
  

export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? 'Yawa ka');
  }
};

const setToken = (token) => {
  Cookies.set('token', token, { expires: 7 });
};
