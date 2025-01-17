import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchSegments } from '@/api/client';
import { Segment } from '@/types';

const SegmentListContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SegmentList: React.FC = () => {
  const { data: segments, error, isLoading } = useQuery<Segment[]>('segments', () => fetchSegments('your_access_token_here'));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading segments</div>;

  return (
    <SegmentListContainer>
      {segments && segments.map((segment: Segment) => (
        <div key={segment.id}>
          <h3>{segment.name}</h3>
          <p>Distance: {segment.distance}m</p>
          <p>Created: {new Date(segment.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </SegmentListContainer>
  );
};

export default SegmentList; 