import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;