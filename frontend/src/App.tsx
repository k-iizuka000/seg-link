import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { StravaLogin } from './components/auth/StravaLogin';
import { StravaCallback } from './components/auth/StravaCallback';
import { Dashboard } from './components/dashboard/Dashboard';
import { SegmentList } from './components/segments/SegmentList';
import { SegmentDetail } from './components/segments/SegmentDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<StravaLogin />} />
              <Route path="/auth/callback" element={<StravaCallback />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/segments"
                element={
                  <ProtectedRoute>
                    <SegmentList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/segments/:id"
                element={
                  <ProtectedRoute>
                    <SegmentDetail />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<StravaLogin />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
