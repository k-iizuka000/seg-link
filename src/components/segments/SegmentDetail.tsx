import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Segment, Effort } from '../../types';

export default function SegmentDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: segment, isLoading: segmentLoading } = useQuery<Segment>({
    queryKey: ['segment', id],
    queryFn: async () => {
      const response = await api.get<Segment>(`/segments/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const { data: efforts, isLoading: effortsLoading } = useQuery<Effort[]>({
    queryKey: ['segment-efforts', id],
    queryFn: async () => {
      const response = await api.get<Effort[]>(`/segments/${id}/efforts`);
      return response.data;
    },
    enabled: !!segment,
  });

  if (segmentLoading || effortsLoading) {
    return <div>Loading...</div>;
  }

  if (!segment) {
    return <div>Segment not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{segment.name}</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">距離</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {(segment.distance / 1000).toFixed(1)}km
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">平均勾配</dt>
                <dd className="mt-1 text-sm text-gray-900">{segment.averageGrade.toFixed(1)}%</dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">獲得標高</dt>
                <dd className="mt-1 text-sm text-gray-900">{segment.totalElevationGain}m</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">自己ベスト</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(segment.prTime * 1000).toISOString().substr(11, 8)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900 mb-4">努力履歴</h4>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {efforts?.map((effort) => (
                <li key={effort.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(effort.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(effort.movingTime * 1000).toISOString().substr(11, 8)}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {effort.averageWatts ? `${Math.round(effort.averageWatts)}W` : 'N/A'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 