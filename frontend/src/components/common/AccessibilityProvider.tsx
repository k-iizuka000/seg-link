import React, { createContext, useContext, useCallback } from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalAccessibilityStyles = createGlobalStyle`
  :root {
    --focus-outline-color: #007bff;
    --focus-outline-width: 3px;
  }

  *:focus-visible {
    outline: var(--focus-outline-width) solid var(--focus-outline-color);
    outline-offset: 2px;
  }

  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #007bff;
    color: white;
    padding: 8px;
    z-index: 100;
    transition: top 0.2s;

    &:focus {
      top: 0;
    }
  }

  [role="button"],
  button {
    cursor: pointer;
  }

  [aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

interface AccessibilityContextType {
  announceMessage: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [announcements, setAnnouncements] = React.useState<string[]>([]);

  const announceMessage = useCallback((message: string) => {
    setAnnouncements(prev => [...prev, message]);
    // メッセージを3秒後に削除
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(m => m !== message));
    }, 3000);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ announceMessage }}>
      <GlobalAccessibilityStyles />
      <a href="#main" className="skip-link">
        メインコンテンツへスキップ
      </a>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, padding: 0, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}
      >
        {announcements.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
}; 