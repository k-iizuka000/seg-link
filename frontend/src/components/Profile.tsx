import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfile {
  name: string;
  weight: number;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfile(response.data);
        setNewWeight(response.data.weight.toString());
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const updateWeight = async () => {
    try {
      await axios.put('/api/user/profile', { weight: parseFloat(newWeight) });
      alert('体重が更新されました');
    } catch (error) {
      console.error('Error updating weight:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>プロフィール</h1>
      <p>ユーザー名: {profile.name}</p>
      <div>
        <label>
          体重:
          <input
            type="text"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button onClick={updateWeight} style={{ marginLeft: '10px', padding: '10px 20px' }}>更新</button>
      </div>
    </div>
  );
}

export default Profile; 