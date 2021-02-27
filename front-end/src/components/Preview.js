import React from 'react';
import styled from 'styled-components';
// import the required libraries
import { useQuery, gql } from '@apollo/client';
import DetailFeed from '../components/DetailFeed';
import { GET_INTERNSHIPS } from '../gql/query';

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 0px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  /* We can nest styles in styled-components */
  /* The following styles will apply to links within the NavList component */
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`;




const Preview = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_INTERNSHIPS);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI

  return (
    <div>  
      <Nav>
        <NavList>
        
        </NavList>
      </Nav>


        {/* <div className="container-fluid">
            <div className="row">
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <DetailFeed internships={data.internshipFeed.internships} />               
                </ul>
            </div>
            </nav>
        </div>            
        </div> */}
        
    </div>
  );
};

export default Preview;