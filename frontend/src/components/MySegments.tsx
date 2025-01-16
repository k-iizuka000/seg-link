import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const MySegments = () => {
  return (
    <Container>
      <h1>Myセグメント一覧</h1>
      <p>セグメント一覧を表示する予定です。</p>
    </Container>
  );
};

export default MySegments; 