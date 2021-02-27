import React from 'react';
// import GraphQL dependencies
import { useQuery, gql } from '@apollo/client';

import Detail from '../components/Detail';

import { GET_INTERNSHIP } from '../gql/query'

const InternshipPage = props => {
  // store the id found in the url as a variable
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_INTERNSHIP, { variables: { id } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;


  return <Detail internship={data.internship} />
};

export default InternshipPage;
