import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string>('Staff');
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem('currentUsername') || 'Staff';
    const capitalized = loggedUser.charAt(0).toUpperCase() + loggedUser.slice(1);
    setUsername(capitalized);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUsername');
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-3">
            <Coffee className="w-10 h-10 text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-800">Cafe Bliss</h1>
          </Link>

          <div className="flex items-center gap-8">
            <p className="text-lg font-medium text-gray-700">
              Welcome, <span className="text-amber-600 font-bold">{username}</span>
            </p>
            {(location.pathname === '/dashboard' || location.pathname === '/order') && (
              <Link to="/order" className="relative p-3 bg-amber-100 rounded-full hover:bg-amber-200 transition">
                <ShoppingCart className="w-7 h-7 text-amber-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;