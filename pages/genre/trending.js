import Navbar from '../../components/Navbar';
import Image from 'next/image';
import axios from 'axios';
import { useAuthentication } from '@/components/authContext';
import styles from '@/styles/movies.module.css';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin']})

export default function Trending({ trendingMovies, trendingTVShows, token }) {
  const { user, loading } = useAuthentication(token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  }

  return (
    <main>
      <Navbar loggedIn={user ? true : false} />

      <div className={`${styles.scrollContainer}, ${font.className}`}>
          <h1 className='Title'>This is the trending Movie list</h1>
          <div className={styles.cardContainer}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className={styles.card}> {/* Apply the cardItem class */}
              <h2 className='Subtitle'>{movie.title}</h2>
              <p className={styles.overview}>{movie.overview}</p>
              <p>Release Date: {movie.release_date}</p>
              <p>{movie.vote_average}</p>
              <div className="poster"> {/* Apply the poster class */}
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

        <div className={`${styles.scrollContainer}, ${font.className}`}>
          <h1 className='Title'>Trending TV Shows</h1>
          <div className={styles.cardContainer}>
          {trendingTVShows.map((tvShow) => (
            <div key={tvShow.id} className={styles.card}> {/* Apply the cardItem class */}
              <h2 className='Subtitle'>{tvShow.name}</h2>
              <p className={styles.overview}>{tvShow.overview}</p>
              <p>First Air Date: {tvShow.first_air_date}</p>
              <div className="poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                  alt={tvShow.name}
                  width={500}
                  height={750}
                />
              </div>
            </div>
          ))}
        </div>
        <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', width: '100%' }}>
          <p style={{ margin: '0' }}>© 2023 Francis Adrian Altesing. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const movieResponse = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day',
      {
        params: {
          language: 'en-US',
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDM1OWE1MzFmN2M1ZjE2NWZlNmIyMWU1NDA3MjNjZiIsInN1YiI6IjY0NTA5Yzk5NDM1MDExMDBlNDgwMzJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4n5ZHNe5QU_UT24Zb4kDsF-6S_3s5qFp5MTtt9pPwhQ',
        },
      }
    );
    const trendingMovies = movieResponse.data.results;

    const tvShowResponse = await axios.get(
      'https://api.themoviedb.org/3/trending/tv/day',
      {
        params: {
          language: 'en-US',
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDM1OWE1MzFmN2M1ZjE2NWZlNmIyMWU1NDA3MjNjZiIsInN1YiI6IjY0NTA5Yzk5NDM1MDExMDBlNDgwMzJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4n5ZHNe5QU_UT24Zb4kDsF-6S_3s5qFp5MTtt9pPwhQ',
        },
      }
    );
    const trendingTVShows = tvShowResponse.data.results;

    console.log('Trending Movies:', trendingMovies);
    console.log('Trending TV Shows:', trendingTVShows);

    return {
      props: {
        trendingMovies,
        trendingTVShows,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
