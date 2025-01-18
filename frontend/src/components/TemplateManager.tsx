import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, SearchBar } from '@/common/components';
import { fetchTemplates } from '@/api/client';
import { Template } from '@/types';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const TemplateManagerContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
  max-width: 1200px;
  margin: 0 auto;
`;

const TemplateCard = styled.div<{ template: Template }>`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:focus-within {
    outline: 2px solid #007bff;
  }
`;

const NewTemplateForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InputField = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ConfirmContent = styled(ModalContent)`
  max-width: 400px;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  console.log('Modal rendered with isOpen:', isOpen);
  
  if (!isOpen) {
    console.log('Modal not rendering - isOpen is false');
    return null;
  }

  const modalContent = (
    <ModalBase onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </ModalBase>
  );

  console.log('Rendering modal with portal');
  return createPortal(modalContent, document.body);
};

const TemplateManager: React.FC = () => {
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTemplateName, setEditTemplateName] = useState('');
  const [editTemplateDescription, setEditTemplateDescription] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Modal state:', { isModalOpen, isConfirmOpen });
  }, [isModalOpen, isConfirmOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsConfirmOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    // 新規テンプレート作成ロジックをここに追加
    apiClient.post('/api/templates', {
      name: newTemplateName,
      description: newTemplateDescription,
    })
    .then((response: any) => {
      console.log('テンプレートが作成されました:', response.data);
      // 作成後の処理をここに追加
    })
    .catch((error: any) => {
      console.error('テンプレート作成エラー:', error);
    });
  };

  const handleEdit = (template: Template) => {
    setEditTemplateName(template.name);
    setEditTemplateDescription(template.templateJson.description || '');
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    // 編集保存ロジックをここに追加
    console.log('編集保存:', editTemplateName, editTemplateDescription);
    setIsModalOpen(false);
  };

  const handleDelete = (templateName: string) => {
    console.log('handleDelete called with:', templateName);
    setTemplateToDelete(templateName);
    setIsConfirmOpen(true);
    console.log('isConfirmOpen set to:', true);
  };

  const confirmDelete = async () => {
    console.log('confirmDelete called');
    if (templateToDelete) {
      try {
        await apiClient.delete(`/api/templates/${templateToDelete}`);
        console.log(`テンプレート "${templateToDelete}" を削除しました。`);
      } catch (error) {
        console.error('テンプレート削除エラー:', error);
      } finally {
        setIsConfirmOpen(false);
        setTemplateToDelete(null);
        console.log('isConfirmOpen set to:', false);
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const { data: templates, error, isLoading } = useQuery('templates', () => fetchTemplates('your_access_token_here'));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading templates</div>;

  return (
    <TemplateManagerContainer>
      <button onClick={handleBackToDashboard}>ダッシュボードに戻る</button>
      <h1>テンプレート管理</h1>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <TemplateActions>
        <Button>新規作成</Button>
        <Button>一括削除</Button>
      </TemplateActions>
      <NewTemplateForm onSubmit={handleCreateTemplate}>
        <InputField
          type="text"
          placeholder="テンプレート名"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="テンプレートの説明"
          value={newTemplateDescription}
          onChange={(e) => setNewTemplateDescription(e.target.value)}
        />
        <Button type="submit">新規作成</Button>
      </NewTemplateForm>
      {templates && templates.map((template: Template) => (
        <TemplateCard key={template.id} template={template}>
          <h3>{template.name}</h3>
          <p>{template.templateJson.description || ''}</p>
          <div>
            <Button onClick={() => handleEdit(template)}>編集</Button>
            <Button onClick={() => handleDelete(template.name)}>削除</Button>
          </div>
        </TemplateCard>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <h2>テンプレートの編集</h2>
          <InputField
            type="text"
            placeholder="テンプレート名"
            value={editTemplateName}
            onChange={(e) => setEditTemplateName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="テンプレートの説明"
            value={editTemplateDescription}
            onChange={(e) => setEditTemplateDescription(e.target.value)}
          />
          <Button onClick={handleSaveEdit}>保存</Button>
          <Button onClick={() => setIsModalOpen(false)}>キャンセル</Button>
        </ModalContent>
      </Modal>
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <ConfirmContent>
          <h2>削除の確認</h2>
          <p>本当にこのテンプレートを削除しますか？</p>
          <Button onClick={confirmDelete}>削除</Button>
          <Button onClick={() => setIsConfirmOpen(false)}>キャンセル</Button>
        </ConfirmContent>
      </Modal>
    </TemplateManagerContainer>
  );
};

export default TemplateManager;
