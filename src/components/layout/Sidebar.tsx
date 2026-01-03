import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUtensils, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaFileInvoiceDollar, 
  FaUser
} from 'react-icons/fa';

const menu = [
  { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
  { to: '/category', icon: FaUtensils, label: 'Category' },
  { to: '/product', icon: FaBoxOpen, label: 'Product' },
  { to: '/order', icon: FaShoppingCart, label: 'Order' },
  { to: '/bill', icon: FaFileInvoiceDollar, label: 'Bill' },
  { to: '/user', icon: FaUser, label: 'User' },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-20 w-64 h-full bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 shadow-xl border-r border-amber-100 dark:border-amber-900/50 transition-colors duration-500">
      <nav className="mt-8 space-y-3 px-6">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-5 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 text-white shadow-lg shadow-amber-300/50 dark:shadow-amber-700/30'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 hover:text-gray-900 dark:hover:text-amber-300 hover:shadow-md'
              }`
            }
          >
            <item.icon size={26} className={`
              ${({ isActive }: { isActive: boolean }) => 
                isActive ? 'text-white' : 'text-gray-700 dark:text-gray-200'
              }
            `} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;