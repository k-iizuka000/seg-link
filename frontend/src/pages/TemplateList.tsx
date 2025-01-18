import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { api } from '../api';
import { Template } from '../types/api';
import { TemplateFormModal } from '../components/TemplateFormModal';

export const TemplateList = () => {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ['templates'],
    queryFn: () => api.get<Template[]>('/templates').then(res => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/templates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const handleSubmit = async (data: Omit<Template, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (editingTemplate) {
      await api.put<Template>(`/templates/${editingTemplate.id}`, data);
    } else {
      await api.post<Template>('/templates', data);
    }
    queryClient.invalidateQueries({ queryKey: ['templates'] });
    setIsCreateModalOpen(false);
    setEditingTemplate(null);
  };

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">テンプレート一覧</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          新規作成
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map(template => (
          <div key={template.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="text-gray-600 hover:text-blue-500"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(template.id)}
                  className="text-gray-600 hover:text-red-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>服装: {template.clothing}</p>
              <p>ホイール: {template.wheels}</p>
              <p>風: {template.wind}</p>
              <p>体重: {template.weight}kg</p>
              {template.notes && <p>メモ: {template.notes}</p>}
            </div>
          </div>
        ))}
      </div>

      {isCreateModalOpen && (
        <TemplateFormModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
      {editingTemplate && (
        <TemplateFormModal
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}; 