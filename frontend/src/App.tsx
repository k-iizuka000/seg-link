import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SegmentsList from './components/SegmentsList';
import SegmentDetail from './components/SegmentDetail';
import ActivityDetail from './components/ActivityDetail';
import AdvancedSearch from './components/AdvancedSearch';
import TemplateManager from './components/TemplateManager';
import Profile from './components/Profile';
import Logout from './components/Logout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <DashboardLayout>
            <div>Dashboard Content</div>
          </DashboardLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/segments" element={<SegmentsList />} />
        <Route path="/segments/:id" element={<SegmentDetail />} />
        <Route path="/activities/:activityId" element={<ActivityDetail />} />
        <Route path="/search" element={<AdvancedSearch />} />
        <Route path="/templates" element={<TemplateManager />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
