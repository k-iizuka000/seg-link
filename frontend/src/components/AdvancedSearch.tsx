import React, { useState } from 'react';
import axios from 'axios';

interface SearchResult {
  name: string;
  type: string; // 'segment' or 'activity'
  details: string;
}

function AdvancedSearch() {
  const [clothing, setClothing] = useState('');
  const [wheel, setWheel] = useState('');
  const [wind, setWind] = useState('');
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = async () => {
    try {
      const response = await axios.post('/api/search', {
        clothing,
        wheel,
        wind,
        weight,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>複合条件検索</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="服装"
          value={clothing}
          onChange={(e) => setClothing(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="ホイール"
          value={wheel}
          onChange={(e) => setWheel(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="風"
          value={wind}
          onChange={(e) => setWind(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="体重"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={performSearch} style={{ padding: '10px 20px' }}>検索</button>
      </div>
      <h2>検索結果</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.type === 'segment' ? 'セグメント' : 'アクティビティ'}: {result.name} - {result.details}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvancedSearch;