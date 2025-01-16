import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdvancedSearch = () => {
  return (
    <Container>
      <h1>複合条件検索</h1>
      <p>複合条件検索フォームを表示する予定です。</p>
    </Container>
  );
};

export default AdvancedSearch;