import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ErrorContainer = styled(motion.div)`
  color: #dc3545;
  padding: 1rem;
  border-radius: 4px;
  background-color: #f8d7da;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:focus {
    outline: 3px solid #28a745;
    outline-offset: 2px;
  }

  &:hover {
    background-color: #218838;
  }
`;

interface ErrorMessageProps {
  title: string;
  message: React.ReactNode;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <ErrorContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="alert"
    >
      {message}
      {onRetry && (
        <RetryButton onClick={onRetry}>
          再試行
        </RetryButton>
      )}
    </ErrorContainer>
  );
};
