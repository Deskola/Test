import React, { useEffect } from 'react';
import { useMutation, gql, from } from '@apollo/client';
import InternshipForm from '../components/InternshipForm'

import { GET_INTERNSHIP, GET_INTERNSHIPS, GET_MY_INTERNSHIPS } from '../gql/query'


const NEW_OPPORTUNITY = gql`
mutation newInternship(
  $organization: String!,
  $position_name: String!,
  $position_number: String,
  $duration: String,
  $responsibility: String!,
  $qualifications: String!,
  $application_info: String!
)
{
newInternships(
  organization: $organization,
  position_name: $position_name,
  position_number: $position_number,
  duration: $duration
  responsibility: $responsibility
  qualifications: $qualifications
  application_info: $application_info  
  
){
  id
  organization
  position_name
  position_number
  duration
  responsibility
  qualifications
  application_info 
  createdAt   
  favoritedBy{
    id
    username
  }
  client{
    id
    username
    avatar
  }
  
}
}
`;

const NewInternship = props => {
  useEffect(() => {    
    // update the document title
        document.title = 'New Note -> Notedly';  
    });  

    const [data, { loading, error }] = useMutation(NEW_OPPORTUNITY, {
      // refetch the GET_NOTES query to update the cache
    refetchQueries: [{ query: GET_INTERNSHIPS },{ query: GET_MY_INTERNSHIPS }],
      onCompleted: data => {
        // when complete, redirect the user to the note page
        props.history.push(`internship/${data.newInternships.id}`);
      }
    });
  
    return(
        <React.Fragment>
            {/* as the mutation is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {error && <p>Error saving the note</p>}
            {/* the form component, passing the mutation data as a prop */}
            <InternshipForm action={data} />
        </React.Fragment>

    ) 
};
export default NewInternship;