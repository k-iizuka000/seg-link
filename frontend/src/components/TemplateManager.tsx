import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

const TemplateManagerContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const TemplateCard = styled.div`
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

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover, &:focus {
    background-color: #0056b3;
    outline: 2px solid #0056b3;
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
    console.log('新規テンプレート作成:', newTemplateName, newTemplateDescription);
  };

  const handleEdit = (template: { name: string; description: string }) => {
    setEditTemplateName(template.name);
    setEditTemplateDescription(template.description);
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

  const templates = [
    { name: 'Summer Ride', description: 'Light clothing, carbon wheels' },
    { name: 'Winter Ride', description: 'Heavy clothing, aluminum wheels' },
    // ダミーデータを追加
  ];

  return (
    <TemplateManagerContainer>
      <h1>テンプレート管理</h1>
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
      {templates.map((template, index) => (
        <TemplateCard key={index}>
          <div>
            <h2>{template.name}</h2>
            <p>{template.description}</p>
          </div>
          <div>
            <Button onClick={() => handleEdit(template)}>編集</Button>
            <Button onClick={() => handleDelete(template.name)}>削除</Button>
          </div>
        </TemplateCard>
      ))}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <h2>テンプレート編集</h2>
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
          <h2>削除確認</h2>
          <p>本当に削除しますか？</p>
          <Button onClick={confirmDelete}>はい</Button>
          <Button onClick={() => setIsConfirmOpen(false)}>いいえ</Button>
        </ConfirmContent>
      </Modal>
    </TemplateManagerContainer>
  );
};

export default TemplateManager;
