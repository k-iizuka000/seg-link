import React from 'react';
import styled from 'styled-components';

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

const StravaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #fc4c02;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e34402;
  }

  img {
    height: 24px;
  }
`;

interface LoginProps {
  isLoading?: boolean;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ isLoading, error }) => {
  const handleStravaLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/strava/login`;
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Stravaと連携する</Title>
        <Description>
          Stravaアカウントでログインして、あなたのセグメントを管理・分析しましょう。
        </Description>
        <StravaButton onClick={handleStravaLogin} disabled={isLoading}>
          <img src="/strava-logo_x2.png" alt="Strava logo" />
          {isLoading ? '接続中...' : 'Stravaで始める'}
        </StravaButton>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
