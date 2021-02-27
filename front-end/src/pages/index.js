import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';




// import shared layout component
import Layout from '../components/Layout';

// import routes
import Home from './home';
import MyInternships from './myInternships';
import Favorites from './favorites';
import InternshipPage from './internshipPage';
import SignUp from './signup';
import SignIn from './signin';
import NewInternship from './new';
import EditInternship from './edit';




const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// define routes
const Pages = () => {
    return (
      <Router>
          {/* Wrap our routes within the Layout component */}
        <Layout>
          <Route exact path="/" component={Home} />
          <PrivateRoute  path="/myinternships" component={MyInternships} />
          <PrivateRoute  path="/favorites" component={Favorites} />
          <Route path="/intership/:id" component={InternshipPage}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/new" component={NewInternship} />
          <PrivateRoute path="/edit/:id" component={EditInternship}/>
        </Layout>        
      </Router>
    );
};

// add the PrivateRoute component below our `Pages` component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};


export default Pages;
  
