import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ProfileInfo = styled.div`
  margin-bottom: 1rem;
`;

const WeightForm = styled.form`
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

const Profile: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
  };

  return (
    <ProfileContainer>
      <h1>プロフィール</h1>
      <ProfileInfo>
        <h2>ユーザー名: John Doe</h2>
        <p>Email: john.doe@example.com</p>
      </ProfileInfo>
      <WeightForm>
        <h3>体重更新</h3>
        <InputField
          type="number"
          placeholder="体重"
          value={weight}
          onChange={handleWeightChange}
        />
        <select value={unit} onChange={handleUnitChange}>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
        </select>
        <button type="submit">更新</button>
      </WeightForm>
    </ProfileContainer>
  );
};

export default Profile; 