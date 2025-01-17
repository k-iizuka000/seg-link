import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Activity } from '../../types';
import { format } from 'date-fns';
import { fetchActivities } from '../../api/client';
import { Button } from '@common/components';

const ActivityFeedContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const ActivityItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const SkeletonItem = styled.div`
  height: 50px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
`;

interface ActivityFeedProps {
  limit?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ limit = 10 }) => {
  const { data: activities, error, isLoading, refetch } = useQuery('activities', () => fetchActivities('your_access_token_here'), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) return (
    <ActivityFeedContainer>
      {[...Array(limit)].map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </ActivityFeedContainer>
  );
  if (error) return (
    <ActivityFeedContainer>
      <div>Error loading activities. Please try again.</div>
      <Button onClick={() => refetch()}>Retry</Button>
    </ActivityFeedContainer>
  );

  return (
    <ActivityFeedContainer>
      {activities && activities.slice(0, limit).map((activity: Activity) => (
        <ActivityItem key={activity.id}>
          <h3>{activity.startDate.toDateString()}</h3>
          <p>{format(new Date(activity.startDate), 'yyyy/MM/dd')}</p>
          <p>{activity.distance} meters</p>
        </ActivityItem>
      ))}
    </ActivityFeedContainer>
  );
};

export default ActivityFeed;