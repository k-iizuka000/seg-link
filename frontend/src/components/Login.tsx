import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles/breakpoints';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const StravaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fc4c02;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e34402;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #fc4c02;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #f8d7da;
`;

interface LoginProps {
  isLoading?: boolean;
  error?: string;
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ isLoading, error, onLogin }) => {
  const handleStravaLogin = () => {
    // Stravaの認証URLにリダイレクト
    const clientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = 'read,activity:read_all,profile:read_all';
    
    window.location.href = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>SegLink</Title>
        <Description>
          Stravaアカウントでログインして、あなたのセグメントを管理・分析しましょう。
        </Description>
        
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <StravaButton onClick={handleStravaLogin}>
            <img src="/strava-logo.png" alt="Strava logo" />
            Stravaでログイン
          </StravaButton>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;