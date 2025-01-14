import React, { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const SegmentDetailContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e0e0e0;
  margin-bottom: 1rem;
`;

const RideHistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 0.9rem;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const FilterInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const GraphContainer = styled.div`
  margin-top: 2rem;
`;

const SegmentDetail: React.FC = () => {
  const [filterTerm, setFilterTerm] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTerm(e.target.value);
  };

  const rideHistory = [
    { date: '2023-10-01', time: '5:30', power: '250W', notes: 'Sunny day' },
    { date: '2023-09-25', time: '6:00', power: '240W', notes: 'Windy' },
    // ダミーデータを追加
  ];

  const filteredRideHistory = rideHistory.filter(ride =>
    ride.notes.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const timeData = {
    labels: rideHistory.map(ride => ride.date),
    datasets: [
      {
        label: 'タイム推移',
        data: rideHistory.map(ride => parseFloat(ride.time.replace(':', '.'))),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const powerData = {
    labels: rideHistory.map(ride => ride.date),
    datasets: [
      {
        label: 'パワー分布',
        data: rideHistory.map(ride => parseInt(ride.power)),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  return (
    <SegmentDetailContainer>
      <h1>セグメント詳細</h1>
      <MapContainer>
        {/* 地図をここに表示 */}
      </MapContainer>
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="備考でフィルター"
          value={filterTerm}
          onChange={handleFilterChange}
        />
      </FilterContainer>
      <RideHistoryTable>
        <thead>
          <tr>
            <th>日付</th>
            <th>タイム</th>
            <th>パワー</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          {filteredRideHistory.map((ride, index) => (
            <tr key={index}>
              <td>{ride.date}</td>
              <td>{ride.time}</td>
              <td>{ride.power}</td>
              <td>{ride.notes}</td>
            </tr>
          ))}
        </tbody>
      </RideHistoryTable>
      <GraphContainer>
        <Line data={timeData} />
        <Line data={powerData} />
      </GraphContainer>
    </SegmentDetailContainer>
  );
};

export default SegmentDetail; 