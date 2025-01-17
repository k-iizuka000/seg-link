import React, { useState } from 'react';
import styled from 'styled-components';

const SegmentsListContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const SearchField = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SortDropdown = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SegmentCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

interface Segment {
  name: string;
  bestTime: string;
  distance: string;
  attempts: number;
}

const SegmentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const segments: Segment[] = [
    { name: 'Segment 1', bestTime: '5:30', distance: '10km', attempts: 3 },
    { name: 'Segment 2', bestTime: '6:15', distance: '8km', attempts: 5 },
    // ダミーデータを追加
  ];

  const currentPage: number = 1;
  const totalPages: number = 5;

  return (
    <SegmentsListContainer>
      <h1>Myセグメント一覧</h1>
      <SearchField
        type="text"
        placeholder="セグメントを検索"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SortDropdown value={sortOption} onChange={handleSortChange}>
        <option value="">ソートを選択</option>
        <option value="bestTime">ベストタイム</option>
        <option value="distance">距離</option>
        <option value="frequency">走行回数</option>
      </SortDropdown>

      {segments.map((segment: Segment, index) => (
        <SegmentCard key={index}>
          <h2>{segment.name}</h2>
          <p>ベストタイム: {segment.bestTime}</p>
          <p>距離: {segment.distance}</p>
          <p>走行回数: {segment.attempts}</p>
        </SegmentCard>
      ))}

      <Pagination>
        <PageButton disabled={currentPage === 1}>前へ</PageButton>
        <span>{currentPage} / {totalPages}</span>
        <PageButton disabled={currentPage === totalPages}>次へ</PageButton>
      </Pagination>
    </SegmentsListContainer>
  );
};

export default SegmentsList; 