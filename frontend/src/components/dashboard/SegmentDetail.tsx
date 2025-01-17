import React from 'react';
import styled from 'styled-components';

const SegmentDetailContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SegmentDetail: React.FC = () => {
  return (
    <SegmentDetailContainer>
      <h2>セグメント詳細</h2>
      <div>
        <h3>セグメント情報</h3>
        <p>詳細情報をここに表示します。</p>
      </div>
      <div>
        <h3>履歴一覧</h3>
        <ul>
          <li>日付: 2023-10-01, タイム: 00:05:30, パワー: 250W, 服装: 夏, ホイール: 標準, 風: 弱, 体重: 70kg</li>
          <li>日付: 2023-09-25, タイム: 00:05:45, パワー: 245W, 服装: 冬, ホイール: 軽量, 風: 中, 体重: 72kg</li>
        </ul>
      </div>
    </SegmentDetailContainer>
  );
};

export default SegmentDetail; 