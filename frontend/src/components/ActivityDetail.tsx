import React from 'react';
import styled from 'styled-components';

const ActivityDetailContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
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
    <ActivityDetailContainer>
      <h1>アクティビティ詳細</h1>
      <ActivityInfo>
        <h2>{activity.title}</h2>
        <p>日付: {activity.date}</p>
        <p>距離: {activity.distance}</p>
        <p>タイム: {activity.time}</p>
        <p>パワー: {activity.power}</p>
      </ActivityInfo>
      <TemplateForm>
        <h3>テンプレート適用</h3>
        <InputField type="text" placeholder="テンプレート名" />
        <InputField type="text" placeholder="服装" />
        <InputField type="text" placeholder="ホイール" />
        <InputField type="text" placeholder="風" />
        <InputField type="text" placeholder="体重" />
        <button type="submit">適用</button>
      </TemplateForm>
      <HistoryContainer>
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
        <SaveButton>保存</SaveButton>
        <CancelButton>キャンセル</CancelButton>
      </ButtonContainer>
    </ActivityDetailContainer>
  );
};

export default ActivityDetail; 