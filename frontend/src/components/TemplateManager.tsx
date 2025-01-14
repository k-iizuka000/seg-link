import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Template {
  id: string;
  name: string;
  mainItems: string;
}

function TemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('/api/templates');
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const deleteTemplate = async (id: string) => {
    try {
      await axios.delete(`/api/templates/${id}`);
      setTemplates(templates.filter(template => template.id !== id));
      alert('テンプレートが削除されました');
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>テンプレート管理</h1>
      <button style={{ marginBottom: '20px', padding: '10px 20px' }}>新規作成</button>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>テンプレート名</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>主要項目</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{template.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{template.mainItems}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button style={{ marginRight: '10px', padding: '5px 10px' }}>編集</button>
                <button onClick={() => deleteTemplate(template.id)} style={{ padding: '5px 10px' }}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TemplateManager; 