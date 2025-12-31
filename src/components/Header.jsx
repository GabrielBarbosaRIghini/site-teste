import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            FarmFresh
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `font-medium ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => 
                  `font-medium ${isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'}`
                }
              >
                Shop
              </NavLink>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>

              <div 
                className="relative cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            <div 
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;