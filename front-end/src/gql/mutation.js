import { gql } from '@apollo/client';

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


const EDIT_OPPORTUNITY = gql`
mutation newInternship(
  $id: ID!
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
  id: $id
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

export { NEW_OPPORTUNITY, EDIT_OPPORTUNITY} 