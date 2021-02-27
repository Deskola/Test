import { gql } from '@apollo/client';

// our GraphQL query, stored as a variable
const GET_INTERNSHIPS = gql`
query internshipFeed($cursor: String){
  internshipFeed(cursor: $cursor){
    internships{
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
    cursor
    hasNextPage
  }
}
`;

const GET_INTERNSHIP = gql`
query internship($id: ID!){
  internship(id: $id){
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

//local query
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const GET_MY_INTERNSHIPS = gql`
query me{
  me{
    id
    username
    internships{
      id
      organization
      position_name
      position_number
      duration
      responsibility
      qualifications
      application_info
      createdAt
      favoriteCount
      client{
        username
        id
        avatar
      }
    }
  }
}
`;

const GET_MY_FAVORITES = gql`
query me{
  me{
    id
    username
    favorites{
      id
      createdAt
      favoriteCount
      client{
        username
        id
        avatar
      }
    }
  }
}
`;

const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
    }
  }
`;

export { 
  GET_INTERNSHIP, 
  GET_INTERNSHIPS, 
  IS_LOGGED_IN,
  GET_MY_INTERNSHIPS,
  GET_MY_FAVORITES,
  GET_ME  
};