import React from 'react';
// import the required libraries
import { useQuery, gql, from } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import DetailFeed from '../components/DetailFeed';
//import { GET_INTERNSHIPS } from '../gql/query'

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
      favoriteCount
      createdAt
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

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_INTERNSHIPS);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the data is successful, display the data in our UI

  // if the data is successful, display the data in our UI
  return (
    // add a <React.Fragment> element to provide a parent element
    <React.Fragment>
      <DetailFeed internships={data.internshipFeed.internships} />
    
      {data.internshipFeed.hasNextPage && (
        <button
        className="btn btn-info"
        onClick={() =>
          fetchMore({
            variables: {
              cursor: data.internshipFeed.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              return {
                internshipFeed: {
                  cursor: fetchMoreResult.internshipFeed.cursor,
                  hasNextPage: fetchMoreResult.internshipFeed.hasNextPage,
                  // combine the new results and the old
                  internships: [
                    ...previousResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  __typename: 'internshipFeed'
                }
              };
            }
          })
        }
    
        >Load more</button>
      )}

    </React.Fragment>
  ) 
    
};

export default Home;
