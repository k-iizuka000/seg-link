import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Template } from '../types/api';

const templateSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  clothing: z.string().min(1, '服装は必須です'),
  wheels: z.string().min(1, 'ホイールは必須です'),
  wind: z.string().min(1, '風は必須です'),
  weight: z.number().min(20, '体重は20kg以上である必要があります'),
  notes: z.string().optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface Props {
  template?: Template;
  onClose: () => void;
  onSubmit: (data: TemplateFormData) => void;
}

export const TemplateFormModal = ({ template, onClose, onSubmit }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: template || {
      name: '',
      clothing: '',
      wheels: '',
      wind: '',
      weight: 0,
      notes: '',
    },
  });

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 w-full">
          <Dialog.Title className="text-lg font-medium mb-4">
            {template ? 'テンプレートを編集' : '新規テンプレート作成'}
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">名前</label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">服装</label>
              <input
                type="text"
                {...register('clothing')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.clothing && (
                <p className="mt-1 text-sm text-red-600">{errors.clothing.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ホイール</label>
              <input
                type="text"
                {...register('wheels')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.wheels && (
                <p className="mt-1 text-sm text-red-600">{errors.wheels.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">風</label>
              <input
                type="text"
                {...register('wind')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.wind && (
                <p className="mt-1 text-sm text-red-600">{errors.wind.message}</p>
              )}
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">メモ</label>
              <textarea
                {...register('notes')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                {template ? '更新' : '作成'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 