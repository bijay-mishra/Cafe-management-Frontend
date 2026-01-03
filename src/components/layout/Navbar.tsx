import { useState } from 'react';
import { LogOut } from 'lucide-react';
import Modal from '../common/Modal';
import DarkModeToggle from '../DarkModeToggle';

const Navbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('darkMode');
    window.location.href = '/';
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md z-50 border-b border-amber-100 dark:border-amber-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">☕</span>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-amber-100">Cafe Bliss</h1>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Admin</span>

            <DarkModeToggle />

            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-full font-medium transition shadow-lg flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>
      <Modal
        title="Logout Confirmation ☕"
        subtitle="Are you sure you want to log out?"
        show={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onSuccess={handleLogoutConfirm}
        successButtonTitle="Yes, Logout"
        cancelButtonTitle="Cancel"
        size="sm"
      >
        <div className="py-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <LogOut className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            You'll be redirected to the home page.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Come back soon — your cafe awaits! ✨
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;