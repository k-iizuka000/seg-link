import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdvancedSearch = () => {
  const [clothing, setClothing] = useState('');
  const [wheel, setWheel] = useState('');
  const [wind, setWind] = useState('');
  const [weightRange, setWeightRange] = useState({ min: '', max: '' });

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with:', { clothing, wheel, wind, weightRange });
  };

  return (
    <Container>
      <h1>複合条件検索</h1>
      <p>複合条件検索フォームを表示する予定です。</p>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div>
          <label>服装選択:</label>
          <input type="text" value={clothing} onChange={(e) => setClothing(e.target.value)} />
        </div>
        <div>
          <label>ホイール選択:</label>
          <input type="text" value={wheel} onChange={(e) => setWheel(e.target.value)} />
        </div>
        <div>
          <label>風条件入力:</label>
          <input type="text" value={wind} onChange={(e) => setWind(e.target.value)} />
        </div>
        <div>
          <label>体重範囲指定:</label>
          <input type="number" placeholder="最小" value={weightRange.min} onChange={(e) => setWeightRange({ ...weightRange, min: e.target.value })} />
          <input type="number" placeholder="最大" value={weightRange.max} onChange={(e) => setWeightRange({ ...weightRange, max: e.target.value })} />
        </div>
        <button type="submit">検索</button>
      </form>
    </Container>
  );
};

export default AdvancedSearch;