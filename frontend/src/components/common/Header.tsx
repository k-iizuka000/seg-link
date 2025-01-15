import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #ffffff;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &.active {
    color: #007bff;
    font-weight: bold;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>SegLink</Logo>
      
      <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </HamburgerButton>

      <Navigation isOpen={isMenuOpen}>
        <StyledLink to="/dashboard">ダッシュボード</StyledLink>
        <StyledLink to="/segments">Myセグメント</StyledLink>
        <StyledLink to="/search">検索</StyledLink>
        <StyledLink to="/templates">テンプレート</StyledLink>
        <StyledLink to="/profile">プロフィール</StyledLink>
      </Navigation>

      <UserInfo>
        <UserAvatar src="/default-avatar.png" alt="User avatar" />
        <StyledLink to="/logout">ログアウト</StyledLink>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
