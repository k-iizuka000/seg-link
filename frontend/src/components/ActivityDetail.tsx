import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ActivityDetail {
  title: string;
  date: string;
  distance: number;
  averageSpeed: number;
  power: number;
  notes: string;
}

function ActivityDetail() {
  const { activityId } = useParams<{ activityId: string }>();
  const [activityDetail, setActivityDetail] = useState<ActivityDetail | null>(null);
  const [template, setTemplate] = useState('');

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await axios.get(`/api/activities/${activityId}`);
        setActivityDetail(response.data);
      } catch (error) {
        console.error('Error fetching activity detail:', error);
      }
    };

    fetchActivityDetail();
  }, [activityId]);

  const applyTemplate = async () => {
    try {
      await axios.post(`/api/activities/${activityId}/update`, { template });
      alert('テンプレートが適用されました');
    } catch (error) {
      console.error('Error applying template:', error);
    }
  };

  if (!activityDetail) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{activityDetail.title}</h1>
      <p>日時: {activityDetail.date}</p>
      <p>距離: {activityDetail.distance} km</p>
      <p>平均速度: {activityDetail.averageSpeed} km/h</p>
      <p>パワー: {activityDetail.power} W</p>
      <p>追記: {activityDetail.notes}</p>
      <div>
        <h2>テンプレート適用</h2>
        <input
          type="text"
          placeholder="テンプレート名"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <button onClick={applyTemplate} style={{ padding: '10px 20px' }}>適用</button>
      </div>
    </div>
  );
}

export default ActivityDetail; 