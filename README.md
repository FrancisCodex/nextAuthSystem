Name: Francis Adrian M. Altesing
Section: ITE18 GP1

Website: Movie Review

As of May 8, 2023
Temporary Version:
The website has its Login and Index
The website has gathered the data needed for the "Films" pages which displays the movies but slight problem,
since I have yet to figure out how to get the images from the strapi server and all the way to the Website folder.
The website is not yet Authenticated, I am still currently working on the authentication.

*UPDATE* as of May 10, 2023 *UPDATE*
Temporary version:
I have made a new NextJS folder to make sure my folder and code is complete and clean.
The website now Authenticated, new users can now register to the website and existing users can now login to the website. All the data goes to the strapi folder as per the video presentation.
The website has no contents yet from the strapi the Films page has been removed and will be added soon as I finish fetching the data required to make the website fully functional.
The index page has not yet been touched and contents will be removed once I set up the necessary code to extract the data from Strapi to the Browse page where users can browse to the many films in the website.


Title: Nuxt.js (Optional Framework) Authentication with Strapi

Objective: Implement a basic authentication system in a Nuxt.js application using Strapi plugins.

Introduction:

In this midterm project, you will implement a simple login and
authentication system in a Nuxt.js application using Strapi plugins.
Strapi is an open-source headless CMS, which can be easily integrated
with Nuxt.js for authentication purposes. This project will provide you
with hands-on experience in creating secure, authenticated applications
with these two powerful technologies.

Requirements:

1.  Basic understanding of Nuxt.js, Vue.js, and JavaScript or any framework you prefer.
2.  Familiarity with Strapi and its plugins.
3.  Node.js and npm installed on your development machine.

Project Outline:


1.  Setting up the environment:

a. Create a new Nuxt.js application.

b. Install and configure the required dependencies for Strapi.   

2.  Setting up Strapi:

a. Install and configure Strapi on your development machine.

b. Create a new Strapi project with authentication plugins.

c. Create a new user role and permissions for the Nuxt.js application.   

3.  Implementing authentication in the Nuxt.js application:

a. Integrate the Strapi authentication plugin with the Nuxt.js application.

b. Create a login form with validation.

c. Implement login functionality and store the JWT token.

d. Create middleware to protect authenticated routes.

e. Implement logout functionality.   

4.  Testing the authentication system:

a. Test the login and logout functionality.

b. Test the middleware to ensure only authenticated users can access protected routes.   

5.  Documentation and presentation:

a. Create a detailed README.md file to explain the project setup, configuration, and usage.

b. Prepare a presentation to showcase the implemented features and their functionality.


6. Publish the project on GitHub:

a. Ensure all the code, configuration files, and documentation are committed to the GitHub repository.

b. Add a descriptive title and a README.md file to the GitHub repository.

c. Make the repository public and share the link with the class and instructors.

   

Deliverables:

1.  A working Nuxt.js application with login and authentication implemented using Strapi plugins.
2.  A detailed README.md file explaining the project setup, configuration, and usage.
3.  A presentation showcasing the implemented features and their functionality.

Evaluation Criteria:

1.  Functionality: The application should have a working login system and protect routes based on authentication status.
2.  Code Quality: The code should be well-structured, clean, and properly commented.
3.  Documentation: The README.md file should provide clear and concise instructions for setting up and using the application.
4.
 Presentation: The presentation should effectively demonstrate the
functionality and features of the implemented authentication system.

Guidelines through the website:


Title: Next.js Login with Strapi User Authentication - Step-by-Step Tutorial

Introduction: In this tutorial, we will walk through the process of setting up user authentication in a Next.js app using Strapi as the back-end. Strapi is a headless CMS that allows for easy API creation and management.

Prerequisites:

-   Basic knowledge of JavaScript and Next.js
-   Familiarity with Strapi
-   Node.js and NPM installed on your system
-   Strapi project set up with user roles and permissions configured
-   Next.js project initialized

Step 1: Install dependencies Install the following packages in your Next.js project:

-   axios: for making HTTP requests
-   SWR: for fetching and caching data

```
npm install axios swr

```

Step 2: Create an API helper Create a new file called `api.js` and add the following code:

```
import axios from 'axios';

const API_URL = 'http://localhost:1337'; // Change this to your Strapi URL

const api = axios.create({
  baseURL: API_URL,
});

export default api;

```

Step 3: Create an Auth context Create a new file called `AuthContext.js` and add the following code:

```
import { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/users/me').then((response) => setUser(response.data));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/local', {
        identifier: email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('authToken', response.data.jwt);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwt}`;
      return true;
    } catch (error) {
      console.log('Error:', error.response.data.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```

Step 4: Wrap your app with AuthProvider In your `_app.js` file, wrap your main app component with the `AuthProvider`:

```
import { AuthProvider } from '../AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

```

Step 5: Create the login page Create a new file called `login.js` inside the `pages` directory and add the following code:

```
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await login(email, password)) {
      router.push('/');
    }
  };

  return (
    <div>
      <h2>Login</h2>
	  <form onSubmit={handleSubmit}>
	    <div>
	      <label htmlFor="email">Email:</label>
	      <input
	        type="email"
	        id="email"
	        value={email}
	        onChange={(e) => setEmail(e.target.value)}
	      />
	    </div>
	    <div>
	      <label htmlFor="password">Password:</label>
	      <input
	        type="password"
	        id="password"
	        value={password}
	        onChange={(e) => setPassword(e.target.value)}
	      />
	    </div>
	    <button type="submit">Login</button>
	  </form>
	</div>
); };
export default Login;

```

Step 6: Add navigation and authentication state Create a new file called `Header.js` and add the following code:

```
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!user && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

Include the `Header` component in your `_app.js` or any other layout component to display it across all pages.

Step 7: Protect routes To protect certain routes and make them accessible only to authenticated users, create a higher-order component (HOC) called `withAuth.js`:

```
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (Component) => (props) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return user ? <Component {...props} /> : null;
};

export default withAuth;

```

Wrap the desired pages with the `withAuth` HOC. For example, in a `pages/protected.js` file:

```
import withAuth from '../withAuth';

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export default withAuth(ProtectedPage);

```

Step 8: Test the login flow Start your Next.js development server and Strapi server, then navigate to the login page (e.g., `http://localhost:3000/login`). Enter the email and password of an existing user in Strapi, and click the "Login" button. If the login is successful, you will be redirected to the homepage or the protected route.

Conclusion: In this tutorial, we have covered how to set up user authentication in a Next.js app using Strapi as the back-end. With this knowledge, you can create more advanced authentication workflows, manage user roles and permissions, and build robust web applications.