import React from 'react';
import styled from 'styled-components';

const TemplateEditorContainer = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TemplateEditor: React.FC = () => {
  return (
    <TemplateEditorContainer>
      <h2>テンプレートエディター</h2>
      <p>テンプレートの編集をここで行います。</p>
    </TemplateEditorContainer>
  );
};

export default TemplateEditor; 