import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTheme, toggleSidebar } from '../store/uiSlice';
import { logout } from '../store/authSlice';
import { Sun, Moon, Menu, Search, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 mr-4 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            
            <Link to="/" className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500">
                Repro
              </span>
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/components" className="text-slate-900 dark:text-slate-100 inline-flex items-center px-1 pt-1 text-sm font-medium">Explore</Link>
              <Link to="/trending" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 inline-flex items-center px-1 pt-1 text-sm font-medium">Trending</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              const term = e.target.search.value.trim();
              if (term) {
                window.location.href = `/components?keyword=${encodeURIComponent(term)}`;
              }
            }} className="hidden sm:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-full bg-slate-50 dark:bg-slate-800/50 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Search components..."
              />
            </form>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/upload" className="hidden sm:flex btn-primary text-sm shadow-md shadow-primary-500/20">
                  Upload Component
                </Link>
                <div className="relative group">
                  <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-slate-300 transition duration-150 ease-in-out">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-1">
                      <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <User size={16} className="mr-2" /> Dashboard
                      </Link>
                      <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut size={16} className="mr-2" /> Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 px-3 py-2 text-sm font-medium">Log in</Link>
                <Link to="/register" className="btn-primary text-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
