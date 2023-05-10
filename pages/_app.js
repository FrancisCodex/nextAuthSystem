import App from 'next/app';
import { fetchUserData } from '../api';
import Cookies from 'js-cookie';
import Router from 'next/router'; 

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req, res } = ctx;
    let token;
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
    let user = null;
    if (token) {
      try {
        user = await fetchUserData(token);
      } catch (error) {
        console.log(error.message);
        if (res) {
          res.writeHead(302, { Location: '/LoginPage' });
          res.end();
        } else {
          Router.push('/LoginPage');
        }
      }
    }
    return {
      pageProps: {
        token,
        user,
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
