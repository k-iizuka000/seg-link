import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import { ApiResponse, User } from '../types/api';

interface StravaStatus {
  connected: boolean;
  lastSync: string;
  activityCount: number;
}

const weightSchema = z.object({
  weight: z.number().min(20, '体重は20kg以上である必要があります'),
});

type WeightFormData = z.infer<typeof weightSchema>;

export const ProfilePage = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<ApiResponse<User>>({
    queryKey: ['profile'],
    queryFn: () => api.get('/users/me').then(res => res.data),
  });

  const { data: stravaStatus } = useQuery<ApiResponse<StravaStatus>>({
    queryKey: ['strava-status'],
    queryFn: () => api.get('/auth/strava/status').then(res => res.data),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<WeightFormData>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight: profile?.data?.weight || 0,
    },
  });

  const weightMutation = useMutation({
    mutationFn: (data: WeightFormData) => api.put<ApiResponse<User>>('/users/me/weight', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>

      <div className="max-w-xl">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">基本情報</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">名前:</span>{' '}
              {profile?.data?.name}
            </p>
            <p>
              <span className="text-gray-600">メールアドレス:</span>{' '}
              {profile?.data?.email}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">体重設定</h2>
          <form onSubmit={handleSubmit(data => weightMutation.mutate(data))} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">体重 (kg)</label>
              <input
                type="number"
                {...register('weight', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              更新
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Strava連携状態</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-600">接続状態:</span>{' '}
              {stravaStatus?.data?.connected ? (
                <span className="text-green-600">接続済み</span>
              ) : (
                <span className="text-red-600">未接続</span>
              )}
            </p>
            {stravaStatus?.data?.connected && (
              <>
                <p>
                  <span className="text-gray-600">最終同期:</span>{' '}
                  {new Date(stravaStatus.data.lastSync).toLocaleString()}
                </p>
                <p>
                  <span className="text-gray-600">同期アクティビティ数:</span>{' '}
                  {stravaStatus.data.activityCount}
                </p>
              </>
            )}
          </div>
          {!stravaStatus?.data?.connected && (
            <a
              href="/auth/strava"
              className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Stravaと接続
            </a>
          )}
        </div>
      </div>
    </div>
  );
}; 