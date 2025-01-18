import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api';
import { ApiResponse } from '../../types/api';
import {
  ChartBarIcon,
  ClockIcon,
  LocationMarkerIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';

interface Segment {
  id: string;
  name: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationHigh: number;
  elevationLow: number;
  totalElevationGain: number;
  efforts: number;
  prTime: number;
  prDate: string;
}

interface Effort {
  id: string;
  elapsedTime: number;
  startDate: string;
  activityName: string;
  averageWatts: number;
  averageHeartrate: number;
  template?: {
    id: string;
    name: string;
    clothing: string;
    wheels: string;
    wind: string;
    weight: number;
  };
}

export const SegmentDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: segment, isLoading: isLoadingSegment } = useQuery<ApiResponse<Segment>>({
    queryKey: ['segment', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Segment>>(`/segments/${id}`);
      return response.data;
    },
  });

  const { data: efforts, isLoading: isLoadingEfforts } = useQuery<ApiResponse<Effort[]>>({
    queryKey: ['segment-efforts', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Effort[]>>(`/segments/${id}/efforts`);
      return response.data;
    },
  });

  if (isLoadingSegment || isLoadingEfforts) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!segment?.data) {
    return <div>セグメントが見つかりません。</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{segment.data.name}</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <LocationMarkerIcon className="h-5 w-5 mr-2" />
                距離
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {(segment.data.distance / 1000).toFixed(1)}km
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                平均勾配
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{segment.data.averageGrade.toFixed(1)}%</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2" />
                獲得標高
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{segment.data.totalElevationGain}m</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                自己ベスト
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(segment.data.prTime * 1000).toISOString().substr(11, 8)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">ライド履歴</h4>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  日付
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  タイム
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  アクティビティ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  パワー
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  心拍数
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  テンプレート
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {efforts?.data?.map((effort) => (
                <tr key={effort.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(effort.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(effort.elapsedTime * 1000).toISOString().substr(11, 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {effort.activityName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {effort.averageWatts}W
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {effort.averageHeartrate}bpm
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {effort.template?.name || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 