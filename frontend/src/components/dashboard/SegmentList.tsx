import React from 'react';
import styled from 'styled-components';

const SegmentListContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SegmentList: React.FC = () => {
  return (
    <SegmentListContainer>
      <h2>セグメント一覧</h2>
      <p>セグメントのリストをここに表示します。</p>
    </SegmentListContainer>
  );
};

export default SegmentList; 