import { useEffect } from 'react';
import axios from 'axios';

export const StravaLogin = () => {
  useEffect(() => {
    const initiateStravaAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/strava`);
        window.location.href = response.data.url;
      } catch (error) {
        console.error('Failed to initiate Strava auth:', error);
      }
    };

    initiateStravaAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Stravaと連携する
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Stravaにリダイレクトしています...
          </p>
        </div>
      </div>
    </div>
  );
}; 