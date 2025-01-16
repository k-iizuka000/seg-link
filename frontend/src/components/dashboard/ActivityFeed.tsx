import React from 'react';
import styled from 'styled-components';
import { ActivityItem } from '../../types/dashboard';
import { formatDistance } from 'date-fns';

const ActivityFeedContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
`;

const ActivityFeedTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ActivityFeed: React.FC = () => {
  return (
    <ActivityFeedContainer>
      <ActivityFeedTitle>最近のアクティビティ</ActivityFeedTitle>
      <ActivityList>
        {/* アクティビティのリストをここに表示 */}
      </ActivityList>
    </ActivityFeedContainer>
  );
};

export default ActivityFeed;