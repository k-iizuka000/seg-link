import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* 他のレイアウトコンポーネント */}
      {children}
    </div>
  );
};

export default DashboardLayout;
