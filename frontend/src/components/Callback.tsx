import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Here you would typically exchange the code for an access token
      console.log('Authorization code:', code);
      // Redirect to the dashboard or another page after processing
      navigate('/dashboard');
    } else {
      console.error('Authorization code not found');
      // Handle error, e.g., redirect to an error page or show a message
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default Callback; 