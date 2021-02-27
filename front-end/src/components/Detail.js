import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import logged in user UI components
import NoteUser from './NoteUser';
// import the IS_LOGGED_IN local query
import { IS_LOGGED_IN } from '../gql/query';


const Detail = ({ internship }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;


  return (
    <article key={internship.id}>
         
          <h2>{internship.organization}</h2>
          <label>Position  Name</label>
          <h6>{internship.position_name}</h6>
          <label>Candidates needed for the postion</label>
          <h6>{internship.position_number}</h6>
          <label>Responsibilities</label>
          <p>{internship.responsibilities}</p>
          <label>Candidate Qulifications</label>
          <p>{internship.qualification}</p>
          <label>Duration</label>
          <p>{internship.duration}</p>
          <label>How to Apply</label>
          <p>{internship.application_info}</p>       
          {internship.createdAt} Favorite: {internship.favoriteCount}{' '}
          <hr/>
        </article>
  );
};

export default Detail;
