import React from 'react';
import logo from '../logo.svg';

// import the Link component from react-router
// new dependencies
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const UserState = styled.div`
  margin-left: auto;
`;


// local query
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Header = props => {
  // query hook for user logged in state
  const { data, client } = useQuery(IS_LOGGED_IN);


  return (   
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
          <a className="navbar-brand" href="#">
          <img src={logo} alt="" width="30" height="24" className="d-inline-block align-top"/>
          Legit staff
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">              
              <Link className="nav-link" to="/myinternships">My Internships</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new"> + New</Link>
            </li>
            
          </ul>
          <UserState>
            <ul className="navbar-nav">
              {data.isLoggedIn ? (
                <Link
                  onClick={() => {
                    //remove the token
                    localStorage.removeItem('token');
                    //clear the application's cache
                    client.resetStore();
                    //update local state
                    client.writeQuery({query:IS_LOGGED_IN, variables: { limit: 5, offset: 0 }, data: { isLoggedIn: false }});
                    //redirect the user to the home page
                    props.history.push('/');
                    document.location.reload()
                  }}>Log Out</Link>
              ) : (
                <p>
                  <Link className="nav-item" to={'/signin'}>Sign In</Link> or{' '}
                  <Link className="nav-item" to={'/signup'}>Sign Up</Link>
                </p>
              )}
            </ul>
          </UserState>

        </div>
      </div>
    </nav>   
  );
};
export default Header;