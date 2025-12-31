import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const MobileMenu = ({ isOpen, onClose }) => {
  const { cartCount, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute top-16 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-l-lg">
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                Shop
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={() => {
              setIsCartOpen(true);
              onClose();
            }}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
          >
            <span>Cart ({cartCount})</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;