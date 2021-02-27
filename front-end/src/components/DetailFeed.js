import React from 'react';
import Detail from './Detail';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;


const DetailFeed = ({ internships }) => {
  return (
    <div>
      {internships.map(internship => (
        <NoteWrapper key={internship.id}>          
          <Detail internship={internship} />
          <Link to={`internship/${internship.id}`}>Permalink</Link>
          
        </NoteWrapper>
      ))}
    </div>
  );
};

export default DetailFeed;
