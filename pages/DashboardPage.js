import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserData, fetchMovies } from '../api';
import LogoutButton from '../components/LogoutButton';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin']})

const DashboardPage = ({ token }) => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setShouldRedirect(true);
      } else {
        try {
          const userData = await fetchUserData(token);
          setUser(userData);

          const moviesData = await fetchMovies(token);
          setMovies(moviesData);
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
      router.push('/LoginPage');
    }
  }, [shouldRedirect, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const uploadUrl = process.env.REACT_APP_UPLOAD_URL;

  return (
    <div className={font.className}>
      <Navbar loggedIn={true} />
      <div className='ContentHeader'>
      <h1>Dashboard</h1>
      <p>Welcome, <span style={{ fontWeight: 'bold' }}>{user.username}</span>!</p>
      {token && <p>JWT Token: {token}</p>}
      <h1>Movie Reviews</h1>
      </div>
      <div>
        {movies.map((movie) => (
          <div key={movie.id} style={cardStyles}>
            <div style={headerStyles}>
              <Link href={`movies/` + movie.attributes.slug}>
              <h2 style={titleStyles}>{movie.attributes.Title}</h2>
              </Link>
              <div style={ratingContainerStyles}>
                <p style={ratingStyles}>{movie.attributes.Rating}</p>
              </div>
            </div>
            <div style={contentContainerStyles}>
              <div style={imageContainerStyles}>
                <img
                  src={`http://localhost:1337${movie.attributes.image?.data?.[0]?.attributes.url}`}
                  alt={movie.attributes.Title}
                  className="movie-image"
                />
              </div>
              <p style={synopsisStyles}>{movie.attributes.reviews.data[0].attributes.reviewtease}</p>
            </div>
          </div>
        ))}
        <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', width: '100%' }}>
          <p style={{ margin: '0' }}>© 2023 Francis Adrian Altesing. All rights reserved.</p>
        </footer>
      </div>
      <style jsx>{`
        .movie-image {
          width: 100%;
          height: 100%;
          display: block;
        }
        .ContentHeader{
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

const cardStyles = {
  width: '50%', // Adjust the desired width
  margin: '0 auto', // Center the container horizontally
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  // display: 'flex', // Add display property
  justifyContent: 'center', // Center the content horizontally
  alignItems: 'center', // Center the content vertically
};


const headerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const titleStyles = {
  fontSize: '20px',
  marginRight: '10px',
};

const ratingContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#ddd',
  marginLeft: '10px',
};

const ratingStyles = {
  fontSize: '12px',
  margin: 0,
};

const contentContainerStyles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const imageContainerStyles = {
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  borderRadius: '10px',
  margin: '10px',
};


const synopsisStyles = {
  fontSize: '20px',
  margin: '0',
  padding: '1.5rem'
};

export default DashboardPage;
