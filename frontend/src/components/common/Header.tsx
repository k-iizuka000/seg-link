import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
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

const Navigation = styled(motion.nav)<{ isOpen: boolean }>`
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

const StyledLink = styled(motion(Link))`
  text-decoration: none;
  color: #333;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
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
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

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
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Logo>SegLink</Logo>
      
      <HamburgerButton 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label="メインメニュー"
      >
        ☰
      </HamburgerButton>

      <AnimatePresence>
        <Navigation 
          isOpen={isMenuOpen}
          role="navigation"
          aria-label="メインナビゲーション"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <StyledLink to="/dashboard" whileHover={{ scale: 1.05 }}>ダッシュボード</StyledLink>
          <StyledLink to="/segments" whileHover={{ scale: 1.05 }}>Myセグメント</StyledLink>
          <StyledLink to="/search" whileHover={{ scale: 1.05 }}>検索</StyledLink>
          <StyledLink to="/templates" whileHover={{ scale: 1.05 }}>テンプレート</StyledLink>
          <StyledLink to="/profile" whileHover={{ scale: 1.05 }}>プロフィール</StyledLink>
        </Navigation>
      </AnimatePresence>

      <UserInfo>
        <UserAvatar src="/default-avatar.png" alt="User avatar" />
        <StyledLink to="/logout">ログアウト</StyledLink>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
