import React, { Suspense } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// APIからダッシュボードデータを取得する関数
const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('ダッシュボードデータの取得に失敗しました');
  }
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ActivityCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;

  &:focus-within {
    outline: 3px solid #007bff;
    outline-offset: 2px;
  }
`;

const QuickAccessLink = styled(motion(Link))`
  background-color: #007bff !important;
  color: white !important;
  padding: 0.75rem 1.5rem !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  margin: 0.5rem !important;
  text-decoration: none !important;
  transition: background-color 0.2s !important;

  &:hover {
    background-color: #0056b3 !important;
  }

  &:focus-visible {
    outline: 3px solid #007bff;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const SkeletonUI = styled.div`
  width: 100%;
  max-width: 600px;
  height: 150px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
  max-width: 600px;
`;

const ErrorMessage = styled(motion.div)`
  // ... existing styles ...
`;

const RetryButton = styled.button`
  // ... existing styles ...

  &:focus-visible {
    outline: 3px solid #28a745;
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.5);
  }
`;

const Dashboard = () => {
  const { error, isLoading, refetch } = useQuery<any, Error>('dashboardData', fetchDashboardData, {
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Handle keyboard navigation
    }
  };

  return (
    <DashboardContainer role="main" aria-label="Dashboard">
      <Suspense fallback={<SkeletonUI />}>
        {isLoading ? (
          <SkeletonUI role="progressbar" aria-busy="true" />
        ) : error ? (
          <ErrorMessage
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error.message}
            <RetryButton 
              onClick={() => refetch()}
              onKeyPress={handleKeyPress}
              aria-label="Retry loading dashboard data"
            >
              Retry
            </RetryButton>
          </ErrorMessage>
        ) : (
          <>
            <h1>ダッシュボード</h1>
            <ActivityCard>
              <h2>最近のアクティビティ</h2>
              <p>アクティビティの詳細情報をここに表示します。</p>
            </ActivityCard>

            <ButtonContainer>
              <QuickAccessLink to="/segments">Myセグメント一覧</QuickAccessLink>
              <QuickAccessLink to="/search">複合条件検索</QuickAccessLink>
              <QuickAccessLink to="/templates">テンプレート管理</QuickAccessLink>
              <QuickAccessLink to="/profile">プロフィール</QuickAccessLink>
            </ButtonContainer>
          </>
        )}
      </Suspense>
    </DashboardContainer>
  );
};

export default Dashboard;
