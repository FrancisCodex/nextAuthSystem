import axios from 'axios';
import { useAuthentication } from '@/components/authContext';
import Navbar from '@/components/Navbar';
import styles from '@/styles/movies.module.css';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ subsets: ['latin']})

export default function TVShows({ popularTVShows, topRatedTVShows, onTheAirTVShows, token }) {
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
        <h1 className='Title'>Popular TV Shows</h1>
        <div className={styles.cardContainer}>
          {popularTVShows.map((tvShow) => (
            <div key={tvShow.id} className={styles.card}>
              <h2 className='Subtitle'>{tvShow.name}</h2>
              <p className={styles.ratings}>{tvShow.vote_average}</p>
              <p className={styles.overview}>{tvShow.overview}</p>
              <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                alt={tvShow.title}
                width={500}
                height={750}
              />
              </div>
              {/* Add more TV show details */}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.scrollContainer}, ${font.className}`}>
        <h1 className='Title'>Top Rated TV Shows</h1>
        <div className={styles.cardContainer}>
          {topRatedTVShows.map((tvShow) => (
            <div key={tvShow.id} className={styles.card}>
              <h2 className='Subtitle'>{tvShow.name}</h2>
              <p className={styles.ratings}>{tvShow.vote_average}</p>
              <p className={styles.overview}>{tvShow.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                alt={tvShow.title}
                width={500}
                height={750}
              />
              {/* Add more TV show details */}
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.scrollContainer}, ${font.className}`}>
        <h1 className='Title'>TV Shows On the Air</h1>
        <div className={styles.cardContainer}>
        {onTheAirTVShows.map((tvShow) => (
          <div key={tvShow.id} className={styles.card}>
            <h2 className='Subtitle'>{tvShow.name}</h2>
            <p className={styles.ratings}>{tvShow.vote_average}</p>
            <p className={styles.overview}>{tvShow.overview}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
              alt={tvShow.title}
              width={500}
              height={750}
              className={styles.posterimg}
            />
            {/* Add more TV show details */}
          </div>
        ))}
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
    const popularTVShowsResponse = await axios.get(
      'https://api.themoviedb.org/3/tv/popular',
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
    const popularTVShows = popularTVShowsResponse.data.results;

    const topRatedTVShowsResponse = await axios.get(
      'https://api.themoviedb.org/3/tv/top_rated',
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
    const topRatedTVShows = topRatedTVShowsResponse.data.results;

    const onTheAirTVShowsResponse = await axios.get(
      'https://api.themoviedb.org/3/tv/on_the_air',
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
    const onTheAirTVShows = onTheAirTVShowsResponse.data.results;

    return {
      props: {
        popularTVShows,
        topRatedTVShows,
        onTheAirTVShows,
        token,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        popularTVShows: [],
        topRatedTVShows: [],
        onTheAirTVShows: [],
        token,
      },
    };
  }
}
