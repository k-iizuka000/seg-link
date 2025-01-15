import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const QuickAccessLink = styled(Link)`
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

const Dashboard: React.FC = () => {
  const isLoading = false; // データ読み込み中の状態を管理

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

        <ButtonContainer>
          <QuickAccessLink to="/segments">Myセグメント一覧</QuickAccessLink>
          <QuickAccessLink to="/search">複合条件検索</QuickAccessLink>
          <QuickAccessLink to="/templates">テンプレート管理</QuickAccessLink>
          <QuickAccessLink to="/profile">プロフィール</QuickAccessLink>
        </ButtonContainer>
      </DashboardContainer>
    </motion.div>
  );
};

export default Dashboard; 