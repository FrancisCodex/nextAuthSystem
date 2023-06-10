import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserData, fetchMovieBySlug } from '../../api';
import Navbar from '../../components/Navbar';


const SlugPage = ({ token }) => {
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setShouldRedirect(true);
      } else {
        try {
          const userData = await fetchUserData(token);
          setUser(userData);

          // Fetch the movie data for the specific slug
          const movieData = await fetchMovieBySlug(token, slug);
          setMovie(movieData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setShouldRedirect(true);
        }
      }
    };

    fetchData();
  }, [token, slug]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/LoginPage');
    }
  }, [shouldRedirect, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || !movie) {
    return null;
  }

  return (
    <div>
      <Navbar loggedIn={true} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', padding: '20px', textAlign: 'center' }}>
          <h1 className="titlepage" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            {movie.data.attributes.Title}
            <span style={{ display: 'inline-block', marginLeft: '10px', backgroundColor: '#cfcfcf', borderRadius: '50%', padding: '5px 10px' }}>
              <span style={{ fontWeight: 'bold' }}>{movie.data.attributes.Rating}</span>
            </span>
          </h1>
          <p className="overview" style={{ marginBottom: '10px' }}>{movie.data.attributes.synopsis}</p>
          <p className="date" style={{ marginBottom: '10px' }}>Release Date: {movie.data.attributes.ReleaseDate}</p>
          <div className="reviews">
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Full Review</h2>
            <h3>{movie.data.attributes.reviews.data[0].attributes.reviewtitle}</h3>
            <p style={{ textAlign: 'justify' }}>{movie.data.attributes.reviews.data[0].attributes.fullreview}</p>
          </div>
        </div>
        <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', width: '100%' }}>
          <p style={{ margin: '0' }}>© 2023 Your Website. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SlugPage;
