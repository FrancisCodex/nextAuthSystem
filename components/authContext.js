import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useAuthentication = (token) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setShouldRedirect(true);
      } else {
        try {
          const userData = await getUserData(token);
          setUser(userData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setShouldRedirect(true);
        }
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/LoginPage'); // Change the login page URL if needed
    }
  }, [shouldRedirect, router]);

  return { user, loading };
};

// Fetch user data using the provided token
const getUserData = async (token) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:1337/api/users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
