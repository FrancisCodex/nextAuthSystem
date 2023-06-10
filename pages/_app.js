import App from 'next/app';
import { fetchUserData } from '../api';
import Cookies from 'js-cookie';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req, res } = ctx;
    let token = null;
    let user = null;

    if (req) {
      const cookies = req.headers.cookie;
      if (cookies) {
        const tokenCookie = cookies.split(';').find((cookie) => cookie.trim().startsWith('token='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    } else {
      token = Cookies.get('token');
    }

    if (token) {
      try {
        user = await fetchUserData(token);
      } catch (error) {
        console.log(error.message);
      }
    }

    const requiresAuth = Component.requiresAuth;
    const isUnauthorized = requiresAuth && !user;

    if (isUnauthorized && res) {
      res.writeHead(302, { Location: '/LoginPage' });
      res.end();
    } else if (isUnauthorized && typeof window !== 'undefined') {
      window.location.href = '/LoginPage';
    }

    const pageProps = { token, user };
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
