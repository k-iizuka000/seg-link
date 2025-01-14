import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Segment {
  name: string;
  bestTime: string;
  attempts: number;
}

function SegmentsList() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('/api/segments');
        setSegments(response.data);
      } catch (error) {
        console.error('Error fetching segments:', error);
      }
    };

    fetchSegments();
  }, []);

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Myセグメント一覧</h1>
      <input
        type="text"
        placeholder="セグメント名で検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>セグメント名</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ベストタイム</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>走行回数</th>
          </tr>
        </thead>
        <tbody>
          {filteredSegments.map((segment, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{segment.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{segment.bestTime}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{segment.attempts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SegmentsList; 