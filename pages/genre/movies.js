import axios from 'axios';
import { useAuthentication } from '@/components/authContext';
import Navbar from '@/components/Navbar';
import styles from '@/styles/movies.module.css';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin']})

export default function Movies({ popularMovies, upcomingMovies, token }) {
  const { user, loading } = useAuthentication(token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  }

  return (
    <div>
      <Navbar loggedIn={user ? true : false} />

      <div className={`${styles.scrollContainer}, ${font.className}`}>
          <h1 className='Title'>Popular Movies</h1>
          <div className={styles.cardContainer}>
            {popularMovies.map((movie) => (
              <div key={movie.id} className={styles.card}>
                <h2 className='Subtitle'>{movie.title}</h2>
                <p className={styles.overview}>{movie.overview}</p>
                <div className="poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                  />
                </div>
              </div>
            ))}
          </div>

        <div className={`${styles.scrollContainer}, ${font.className}`}>
            <h1 className='Title'>Upcoming Movies</h1>
            <div className={styles.cardContainer}>
              {upcomingMovies.map((movie) => (
                <div key={movie.id} className={styles.card}>
                  <h2 className='Subtitle'>{movie.title}</h2>
                  <p className={styles.overview}>{movie.overview}</p>
                  <div className="poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      width={500}
                      height={750}
                    />
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
      <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', width: '100%' }}>
          <p style={{ margin: '0' }}>© 2023 Francis Adrian Altesing. All rights reserved.</p>
        </footer>
    </div>
  );
}



export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token; // Assuming you have the token stored in a cookie

  try {
    const popularMoviesResponse = await axios.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDM1OWE1MzFmN2M1ZjE2NWZlNmIyMWU1NDA3MjNjZiIsInN1YiI6IjY0NTA5Yzk5NDM1MDExMDBlNDgwMzJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4n5ZHNe5QU_UT24Zb4kDsF-6S_3s5qFp5MTtt9pPwhQ',
        },
      }
    );
    const popularMovies = popularMoviesResponse.data.results;

    const upcomingMoviesResponse = await axios.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      {
        params: {
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDM1OWE1MzFmN2M1ZjE2NWZlNmIyMWU1NDA3MjNjZiIsInN1YiI6IjY0NTA5Yzk5NDM1MDExMDBlNDgwMzJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4n5ZHNe5QU_UT24Zb4kDsF-6S_3s5qFp5MTtt9pPwhQ',
        },
      }
    );
    const upcomingMovies = upcomingMoviesResponse.data.results;

    return {
      props: {
        popularMovies,
        upcomingMovies,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

  