import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

// TODO: Implement dashboard layout with authentication check
// Related: QA.md - Dashboard Component Structure
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // TODO: Implement redirect to login page
    return <div>Please login to access dashboard</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};