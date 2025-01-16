import React from 'react';
import styled from 'styled-components';

const SearchResultsContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchResults: React.FC = () => {
  return (
    <SearchResultsContainer>
      <h2>検索結果</h2>
      <p>検索結果をここに表示します。</p>
    </SearchResultsContainer>
  );
};

export default SearchResults; 