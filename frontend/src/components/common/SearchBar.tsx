import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;
`;

const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="検索..." />
    </SearchBarContainer>
  );
};

export default SearchBar; 