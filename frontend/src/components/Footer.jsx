import React from 'react';
import { Globe, MessageCircle, Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-500 block mb-4">
              Repro
            </span>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
              The ultimate collaborative repository system to manage, share, and version reusable project components across your developer ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 border border-slate-200 dark:border-slate-700 rounded-full text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 border border-slate-200 dark:border-slate-700 rounded-full text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="p-2 border border-slate-200 dark:border-slate-700 rounded-full text-slate-400 hover:text-primary-500 hover:border-primary-500 transition-colors">
                <Briefcase size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Repro System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
