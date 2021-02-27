import React from 'react';
import { useQuery, useMutation, gql, from } from '@apollo/client';

import Detail from '../components/Detail';
import { GET_INTERNSHIP, GET_ME, GET_MY_INTERNSHIPS } from '../gql/query'
import{ EDIT_OPPORTUNITY} from '../gql/mutation'
import InternshipForm from '../components/InternshipForm'

const EditInternship = props => {
    // store the id found in the url as a variable
  const id = props.match.params.id;
  // define our note query
  const { loading, error, data } = useQuery(GET_INTERNSHIP, { variables: { id } });
  // fetch the current user's data
  const { data: userdata } = useQuery(GET_ME);
 

  // if the data is loading, display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;
  // if the current user and the author of the note do not match
  if (userdata.me.id !== data.internship.client.id) {
    return <p>You do not have access to edit this note</p>;
  }

  // pass the data to the form component
  return <InternshipForm qualifications={data.internship.qualifications} />;
  };
  
  export default EditInternship;