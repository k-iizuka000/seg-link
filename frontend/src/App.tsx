import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import isPropValid from '@emotion/is-prop-valid';
import Callback from './components/Callback';

// Lazy load components
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const ActivityDetail = React.lazy(() => import('./components/ActivityDetail'));
const AdvancedSearch = React.lazy(() => import('./components/AdvancedSearch'));
const TemplateManager = React.lazy(() => import('./components/TemplateManager').then(module => ({ default: module.default })));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Login = React.lazy(() => import('./components/Login'));
const Segments = React.lazy(() => import('./components/Segments'));
const Profile = React.lazy(() => import('./components/Profile'));
const SegmentList = React.lazy(() => import('./components/dashboard/SegmentList'));
const SearchResults = React.lazy(() => import('./components/SearchResults'));
const TemplateEditor = React.lazy(() => import('./components/TemplateEditor'));

// Theme definition
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#0056b3',
    background: '#f5f5f5',
    text: '#333',
  },
};

// 認証状態に応じたリダイレクト制御を行うコンポーネント
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (!isAuthenticated && location.pathname !== '/callback') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* パブリックルート */}
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/callback" element={<Callback />} />

            {/* プライベートルート */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/activity/:id" element={<PrivateRoute><ActivityDetail /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><AdvancedSearch /></PrivateRoute>} />
            <Route path="/templates" element={<PrivateRoute><TemplateManager /></PrivateRoute>} />
            <Route path="/segments" element={<PrivateRoute><Segments /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/segment-list" element={<PrivateRoute><SegmentList /></PrivateRoute>} />
            <Route path="/search-results" element={<PrivateRoute><SearchResults /></PrivateRoute>} />
            <Route path="/template-editor" element={<PrivateRoute><TemplateEditor /></PrivateRoute>} />
            
            {/* 404ページ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
