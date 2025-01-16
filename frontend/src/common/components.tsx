import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover, &:focus {
    background-color: #0056b3;
    outline: 2px solid #0056b3;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchBar = () => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
    <Input type="text" placeholder="検索..." style={{ flex: 1, border: 'none', outline: 'none' }} />
  </div>
); 