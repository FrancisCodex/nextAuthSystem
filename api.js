import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = 'http://127.0.0.1:1337';

//login
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

//register
export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/local/register`, {
      username,
      email,
      password,
      role: 'Registered User', // Set the desired role for the new user
    });
    const { jwt: token, user } = response.data;
    console.log('Token:', token);
    setToken(token);
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message[0]?.messages[0]?.message ?? 'Something went wrong');
  }
};

// fetch user data
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? 'Error in API.js');
  }
};

const setToken = (token) => {
  Cookies.set('token', token, { expires: 7 });
};

//fetch movie data
export const fetchMovies = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/api/movies?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movies = response.data.data;

    // Extract the image URLs for each movie
    const moviesWithImageUrls = movies.map((movie) => {
      const image = movie.attributes.image.data[0];
      const imageUrl = `${apiUrl}${image.attributes.url}`;
      return {
        ...movie,
        imageUrl,
      };
    });

    return moviesWithImageUrls;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? 'Error fetching movies');
  }
};

// fetch movie by slug
export const fetchMovieBySlug = async (token, slug) => {
  try {
    const response = await axios.get(`${apiUrl}/api/slugify/slugs/movie/${slug}?populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message ?? 'Error fetching movie by slug');
  }
};

