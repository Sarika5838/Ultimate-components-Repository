import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Compass, TrendingUp, Grid, UploadCloud, User as UserIcon, Settings, X, LogIn, UserPlus } from 'lucide-react';
import { toggleSidebar } from '../store/uiSlice';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navItemClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
    }`;

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore Components', path: '/components', icon: Compass },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'Categories', path: '/categories', icon: Grid },
  ];

  const authLinks = user ? [
    { name: 'Dashboard', path: '/dashboard', icon: UserIcon },
    { name: 'Upload', path: '/upload', icon: UploadCloud },
    { name: 'Settings', path: '/settings', icon: Settings },
  ] : [
    { name: 'Log in', path: '/login', icon: LogIn },
    { name: 'Sign up', path: '/register', icon: UserPlus },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:mt-16 md:h-[calc(100vh-4rem)] md:w-64`}
      >
        <div className="flex justify-between items-center p-4 md:hidden border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500">
            Repro
          </span>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">Discover</h4>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={navItemClass}>
                  <link.icon size={18} className="mr-3" />
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-4">
              {user ? 'My Workspace' : 'Account'}
            </h4>
            <nav className="space-y-1">
              {authLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={navItemClass}>
                  <link.icon size={18} className="mr-3" />
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {user && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
            <div className="bg-gradient-to-r from-primary-500 to-indigo-500 rounded-xl p-4 text-white">
              <h4 className="font-medium text-sm mb-1">Go Premium</h4>
              <p className="text-xs text-primary-100 mb-3 leading-relaxed">
                Unlock advanced analytics and team collaboration features.
              </p>
              <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold hover:shadow-md transition-shadow">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
