import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Activity {
  title: string;
  distance: number;
}

interface Profile {
  name: string;
  weight: number;
}

function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [profile, setProfile] = useState<Profile>({ name: '', weight: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesResponse = await axios.get('/api/activities/recent');
        setActivities(activitiesResponse.data);

        const profileResponse = await axios.get('/api/user/profile');
        setProfile(profileResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>ダッシュボード</h1>
      <nav style={{ marginBottom: '20px' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/segments">Myセグメント一覧</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/search">複合検索</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/templates">テンプレート管理</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/profile">プロフィール</a></li>
          <li style={{ display: 'inline', marginRight: '10px' }}><a href="/logout">ログアウト</a></li>
        </ul>
      </nav>
      <section>
        <h2>最近のアクティビティ</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity.title} - {activity.distance} km</li>
          ))}
        </ul>
        <h2>プロフィール</h2>
        <p>名前: {profile.name}</p>
        <p>体重: {profile.weight} kg</p>
      </section>
    </div>
  );
}

export default Dashboard; 