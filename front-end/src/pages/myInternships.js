import React, { useEffect } from 'react';
import { useQuery, gql, from } from '@apollo/client'

import DetailFeed from '../components/DetailFeed'
import { GET_MY_INTERNSHIPS } from '../gql/query'


const MyInternships = () => {
    useEffect(() => {    
        // update the document title
        document.title = 'My Internships " Legit stuff'; 
    }); 

    const { loading, error, data } = useQuery(GET_MY_INTERNSHIPS);

    // if the data is loading, our app will display a loading message
    if (loading) return 'Loading...';
    // if there is an error fetching the data, display an error message
    if (error) return `Error! ${error.message}`;
    // if the query is successful and there are notes, return the feed of notes
    // else if the query is successful and there aren't notes, display a message
    if (data.me.internships.length !== 0) {
        return <DetailFeed internships={data.me.internships} />;
    } else {
        return <p>No notes yet</p>;
    }

};

export default MyInternships;