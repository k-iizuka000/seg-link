import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
