import { useEffect } from 'react';
import { api } from '../../api';
import { ApiResponse } from '../../types/api';

interface StravaAuthResponse {
  url: string;
}

export const StravaLogin = () => {
  useEffect(() => {
    const initiateStravaAuth = async () => {
      try {
        const response = await api.get<ApiResponse<StravaAuthResponse>>('/auth/strava');
        window.location.href = response.data.data.url;
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