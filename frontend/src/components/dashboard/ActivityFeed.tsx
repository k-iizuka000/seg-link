import React from 'react';
import styled from 'styled-components';

const ActivityFeedContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityFeedTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityFeed: React.FC = () => {
  return (
    <ActivityFeedContainer>
      <ActivityFeedTitle>最近のアクティビティ</ActivityFeedTitle>
      <ActivityList>
        <ActivityItem>アクティビティの内容がここに表示されます</ActivityItem>
      </ActivityList>
    </ActivityFeedContainer>
  );
};

export default ActivityFeed; 