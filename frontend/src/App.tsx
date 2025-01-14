import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
