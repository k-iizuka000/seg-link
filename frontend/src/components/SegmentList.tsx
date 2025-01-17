import React from 'react';
import styled from 'styled-components';
import { Segment } from '@/types/Activity';

type SegmentProps = {
  segment: Segment;
};

const SegmentContainer = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const SegmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SegmentName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const SegmentDescription = styled.p`
  color: #666;
  margin: 0;
`;

const SegmentList: React.FC<SegmentProps> = ({ segment }) => {
  return (
    <SegmentContainer>
      <SegmentHeader>
        <SegmentName>{segment.name}</SegmentName>
      </SegmentHeader>
      <SegmentDescription>{segment.description}</SegmentDescription>
    </SegmentContainer>
  );
};

export default SegmentList; 