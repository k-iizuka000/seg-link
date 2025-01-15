import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

const ActivityDetailContainer = styled(motion.div)`
  padding: 2rem;
  background-color: #f5f5f5;
  outline: none;
  
  &:focus-visible {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
`;

const ActivityInfo = styled.div`
  margin-bottom: 1rem;
`;

const TemplateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const HistoryContainer = styled.div`
  margin-top: 2rem;
`;

const SyncStatus = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #e0f7fa;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e53935;
  }
`;

const ActivityDetail: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Handle escape key
      containerRef.current?.blur();
    }
  };

  const activity = {
    title: 'Morning Ride',
    date: '2023-10-01',
    distance: '25km',
    time: '1:15:30',
    power: '200W',
  };

  const editHistory = [
    '2023-10-01: テンプレート適用 - 服装: 夏用ジャージ',
    '2023-09-25: 風情報更新 - 風速: 5m/s',
    // ダミーデータを追加
  ];

  return (
    <ActivityDetailContainer
      ref={containerRef}
      role="region"
      aria-label="Activity Details"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>アクティビティ詳細</h1>
      <ActivityInfo role="article" aria-label="Activity Information">
        <h2>{activity.title}</h2>
        <p>日付: {activity.date}</p>
        <p>距離: {activity.distance}</p>
        <p>タイム: {activity.time}</p>
        <p>パワー: {activity.power}</p>
      </ActivityInfo>
      <TemplateForm 
        role="form" 
        aria-label="Activity Edit Form"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <h3>テンプレート適用</h3>
        <InputField
          {...register('title')}
          aria-label="Activity Title"
          aria-required="true"
          aria-invalid={errors.title ? 'true' : 'false'}
          type="text"
          placeholder="テンプレート名"
        />
        <InputField type="text" placeholder="服装" />
        <InputField type="text" placeholder="ホイール" />
        <InputField type="text" placeholder="風" />
        <InputField type="text" placeholder="体重" />
        <button type="submit">適用</button>
      </TemplateForm>
      <HistoryContainer
        role="log"
        aria-label="Edit History"
      >
        <h3>編集履歴</h3>
        <ul>
          {editHistory.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </HistoryContainer>
      <SyncStatus>
        <p>Strava同期状態: 同期済み</p>
      </SyncStatus>
      <ButtonContainer>
        <SaveButton
          type="submit"
          aria-label="Save Changes"
          role="button"
        >
          Save
        </SaveButton>
        <CancelButton
          type="button"
          aria-label="Cancel Changes"
          role="button"
        >
          Cancel
        </CancelButton>
      </ButtonContainer>
    </ActivityDetailContainer>
  );
};

export default ActivityDetail; 