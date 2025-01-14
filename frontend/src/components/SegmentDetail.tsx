import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Ride {
  date: string;
  time: string;
  averagePower: number;
  equipment: string;
}

interface SegmentDetail {
  name: string;
  distance: number;
  rides: Ride[];
}

function SegmentDetail() {
  const { id } = useParams<{ id: string }>();
  const [segmentDetail, setSegmentDetail] = useState<SegmentDetail | null>(null);

  useEffect(() => {
    const fetchSegmentDetail = async () => {
      try {
        const response = await axios.get(`/api/segments/${id}`);
        setSegmentDetail(response.data);
      } catch (error) {
        console.error('Error fetching segment detail:', error);
      }
    };

    fetchSegmentDetail();
  }, [id]);

  if (!segmentDetail) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{segmentDetail.name}</h1>
      <p>距離: {segmentDetail.distance} km</p>
      <h2>ライド履歴</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>日時</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>タイム</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>平均パワー</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>装備</th>
          </tr>
        </thead>
        <tbody>
          {segmentDetail.rides.map((ride, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ride.date}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ride.time}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ride.averagePower} W</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ride.equipment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SegmentDetail; 