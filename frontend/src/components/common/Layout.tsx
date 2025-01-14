import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { mediaQueries } from '../../styles/breakpoints';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  ${mediaQueries.tablet} {
    padding: 2rem;
  }

  ${mediaQueries.desktop} {
    padding: 2rem 4rem;
  }
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

export default Layout;
