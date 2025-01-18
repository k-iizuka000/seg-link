import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

interface SearchResult {
  id: string;
  name: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationDifference: number;
  clothing: string;
  wheels: string;
  wind: string;
  weight: number;
  bestTime: number;
}

const searchSchema = z.object({
  clothing: z.string().optional(),
  wheels: z.string().optional(),
  wind: z.string().optional(),
  weight: z.number().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useState<SearchFormData | null>(null);

  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const { data: searchResults, isLoading } = useQuery<SearchResult[]>({
    queryKey: ['search', searchParams],
    queryFn: () => 
      searchParams 
        ? api.get<SearchResult[]>('/segments/search', { params: searchParams }).then(res => res.data)
        : Promise.resolve([]),
    enabled: !!searchParams,
  });

  const onSubmit = (data: SearchFormData) => {
    setSearchParams(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">複合条件検索</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">服装</label>
            <input
              type="text"
              {...register('clothing')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="例: 半袖ジャージ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ホイール</label>
            <input
              type="text"
              {...register('wheels')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="例: カーボン"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">風</label>
            <input
              type="text"
              {...register('wind')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="例: 向かい風"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">体重 (kg)</label>
            <input
              type="number"
              {...register('weight', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="例: 65"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            検索
          </button>
        </div>
      </form>

      {isLoading ? (
        <div>読み込み中...</div>
      ) : searchResults?.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{result.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>距離: {result.distance}km</p>
                <p>平均勾配: {result.averageGrade}%</p>
                <p>最大勾配: {result.maximumGrade}%</p>
                <p>標高差: {result.elevationDifference}m</p>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>服装: {result.clothing}</p>
                <p>ホイール: {result.wheels}</p>
                <p>風: {result.wind}</p>
                <p>体重: {result.weight}kg</p>
              </div>
            </div>
          ))}
        </div>
      ) : searchParams ? (
        <div className="text-center text-gray-500">
          条件に一致するセグメントが見つかりませんでした
        </div>
      ) : null}
    </div>
  );
}; 