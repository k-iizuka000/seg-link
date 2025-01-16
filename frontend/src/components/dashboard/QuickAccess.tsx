import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUsers, FaFileAlt, FaSearch, FaCog } from 'react-icons/fa';

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

const QuickAccessButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 6px;
  text-decoration: none;
  color: #444;
  transition: all 0.2s;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const QuickAccess: React.FC = () => {
  return (
    <QuickAccessContainer>
      <QuickAccessTitle>クイックアクセス</QuickAccessTitle>
      <QuickAccessGrid>
        <QuickAccessButton to="/segments"><FaUsers />セグメント</QuickAccessButton>
        <QuickAccessButton to="/templates"><FaFileAlt />テンプレート</QuickAccessButton>
        <QuickAccessButton to="/search"><FaSearch />検索</QuickAccessButton>
        <QuickAccessButton to="/settings"><FaCog />設定</QuickAccessButton>
      </QuickAccessGrid>
    </QuickAccessContainer>
  );
};

export default QuickAccess; 