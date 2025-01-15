import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// 遅延ローディングの実装
const lazy = (fn: () => Promise<{ default: React.ComponentType }>) => {
  const Component: React.FC = () => {
    const [comp, setComp] = useState<React.ComponentType | null>(null);
    useEffect(() => {
      fn().then(mod => {
        setComp(() => mod.default);
      });
    }, []);
    return comp ? React.createElement(comp) : null;
  };
  return Component;
};

const Dashboard = lazy(() => import('./components/Dashboard'));
const ActivityDetail = lazy(() => import('./components/ActivityDetail'));
const AdvancedSearch = lazy(() => import('./components/AdvancedSearch'));
const TemplateManager = lazy(() => import('./components/TemplateManager'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/search" element={<AdvancedSearch />} />
          <Route path="/templates" element={<TemplateManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
