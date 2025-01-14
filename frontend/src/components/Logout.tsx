import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      alert('ログアウトしました');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>設定</h1>
      <button onClick={handleLogout} style={{ padding: '10px 20px', fontSize: '16px' }}>ログアウト</button>
    </div>
  );
}

export default Logout; 