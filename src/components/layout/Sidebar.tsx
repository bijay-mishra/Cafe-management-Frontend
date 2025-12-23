import { NavLink } from 'react-router-dom';
import { FaHome, FaUtensils, FaBoxOpen, FaShoppingCart, FaFileInvoiceDollar } from 'react-icons/fa';

const menu = [
  { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
  { to: '/category', icon: FaUtensils, label: 'Category' },
  { to: '/product', icon: FaBoxOpen, label: 'Product' },
  { to: '/order', icon: FaShoppingCart, label: 'Order' },
  { to: '/bill', icon: FaFileInvoiceDollar, label: 'Bill' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-100 min-h-screen p-6">
      <nav className="space-y-4">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-lg text-lg font-medium transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
              }`
            }
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;