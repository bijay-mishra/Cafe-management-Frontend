const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  return (
    <header className="bg-blue-600 text-white p-6 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <span className="text-4xl">☕</span>
        <h1 className="text-3xl font-bold">Cafe Management System</h1>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-xl font-medium">Admin</span>
        <button onClick={handleLogout} className="bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;