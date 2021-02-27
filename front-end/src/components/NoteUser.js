import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';

const NoteUser = props => {

  return <Link to={`/edit/${props.internship.id}`}>Edit</Link>;
};

export default NoteUser;