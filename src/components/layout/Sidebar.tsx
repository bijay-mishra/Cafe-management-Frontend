import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUtensils, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaFileInvoiceDollar 
} from 'react-icons/fa';

const menu = [
  { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
  { to: '/category', icon: FaUtensils, label: 'Category' },
  { to: '/product', icon: FaBoxOpen, label: 'Product' },
  { to: '/order', icon: FaShoppingCart, label: 'Order' },
  { to: '/bill', icon: FaFileInvoiceDollar, label: 'Bill' },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-20 w-64 h-full bg-gradient-to-b from-amber-50 to-orange-50 shadow-xl border-r border-amber-100">
      <nav className="mt-8 space-y-3 px-6">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-5 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-300/50'
                  : 'text-gray-700 hover:bg-amber-100/70 hover:text-gray-900 hover:shadow-md'
              }`
            }
          >
            <item.icon size={26} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;