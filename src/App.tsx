import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from './pages/Dashboard';

import Login from './pages/Login';
import ProductPage from './pages/Product';
import OrderPage from './pages/Order';
import BillPage from './pages/Bill';
import CategoryPage from './pages/Category';
import LandingPage from './components/landing/LandingPage';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
        <Route path="/product" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="/bill" element={<ProtectedRoute><BillPage /></ProtectedRoute>} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;