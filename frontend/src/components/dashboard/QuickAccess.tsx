import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuickAccessContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuickAccessTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const QuickAccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const QuickAccessItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: #333;
  border: 1px solid #eee;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const QuickAccess: React.FC = () => {
  return (
    <QuickAccessContainer>
      <QuickAccessTitle>クイックアクセス</QuickAccessTitle>
      <QuickAccessGrid>
        <QuickAccessItem to="/segments">セグメント</QuickAccessItem>
        <QuickAccessItem to="/templates">テンプレート</QuickAccessItem>
        <QuickAccessItem to="/profile">プロフィール</QuickAccessItem>
      </QuickAccessGrid>
    </QuickAccessContainer>
  );
};

export default QuickAccess; 