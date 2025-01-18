import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api';
import { useAuth } from '../../hooks/useAuth';
import { ApiResponse } from '../../types/api';

interface StravaCallbackResponse {
  accessToken: string;
  refreshToken: string;
}

export const StravaCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      if (!code) {
        console.error('No code provided');
        navigate('/login');
        return;
      }

      try {
        const response = await api.get<ApiResponse<StravaCallbackResponse>>(
          '/auth/strava/callback',
          { params: { code } }
        );

        const { accessToken, refreshToken } = response.data.data;
        await login(accessToken, refreshToken);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to handle Strava callback:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            認証中...
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Stravaとの連携を完了しています
          </p>
        </div>
      </div>
    </div>
  );
}; 