import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import isPropValid from '@emotion/is-prop-valid';

// コンポーネントの遅延ロード
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const ActivityDetail = React.lazy(() => import('./components/ActivityDetail'));
const AdvancedSearch = React.lazy(() => import('./components/AdvancedSearch'));
const TemplateManager = React.lazy(() => import('./components/TemplateManager'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Login = React.lazy(() => import('./components/Login'));
const Segments = React.lazy(() => import('./components/Segments'));
const Profile = React.lazy(() => import('./components/Profile'));

// テーマの定義
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#0056b3',
    background: '#f5f5f5',
    text: '#333',
  },
};

const App: React.FC = () => {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={theme}>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activity/:id" element={<ActivityDetail />} />
              <Route path="/search" element={<AdvancedSearch />} />
              <Route path="/templates" element={<TemplateManager />} />
              <Route path="/segments" element={<Segments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
