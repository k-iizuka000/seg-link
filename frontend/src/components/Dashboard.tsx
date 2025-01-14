import React from 'react';
import styled from 'styled-components';

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
`;

const QuickAccessButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
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

const Dashboard: React.FC = () => {
  const isLoading = false; // データ読み込み中の状態を管理

  return (
    <DashboardContainer>
      <h1>ダッシュボード</h1>
      {isLoading ? (
        <SkeletonUI />
      ) : (
        <ActivityCard>
          <h2>最近のアクティビティ</h2>
          <p>アクティビティの詳細情報をここに表示します。</p>
        </ActivityCard>
      )}

      <div>
        <QuickAccessButton>Myセグメント一覧</QuickAccessButton>
        <QuickAccessButton>複合条件検索</QuickAccessButton>
        <QuickAccessButton>テンプレート管理</QuickAccessButton>
        <QuickAccessButton>プロフィール</QuickAccessButton>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard; 