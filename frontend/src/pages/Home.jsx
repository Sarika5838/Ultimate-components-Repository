import React, { useState } from 'react';
import { Search, Code, Layers, Zap, Star, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TrendingComponentCard = ({ title, category, author, downloads, rating }) => (
  <Link to="/components" className="card group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
    <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center p-4">
      <div className="w-full h-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-400">
        Demo Preview
      </div>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold px-2 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-md">
          {category}
        </span>
        <div className="flex items-center text-amber-500">
          <Star size={14} className="fill-current mr-1" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{rating}</span>
        </div>
      </div>
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex items-center">
        by <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">{author}</span>
      </p>
      <div className="flex justify-between items-center text-xs font-medium text-slate-500">
        <span className="flex items-center"><Zap size={14} className="mr-1 text-slate-400" /> {downloads} Downloads</span>
      </div>
    </div>
  </Link>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/components?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/components');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 mb-12 border border-slate-800 isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-indigo-900/40 to-slate-900 z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl opacity-50 z-0" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-50 z-0" />

        <div className="relative z-10 px-6 py-20 sm:px-12 sm:py-24 lg:px-16 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
            The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-300">Component</span> Repository
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl">
            Discover, share, and manage production-ready React components, Node.js modules, and templates to accelerate your development workflow.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-2xl relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-14 pr-4 py-4 md:py-5 border-none rounded-2xl bg-white/10 backdrop-blur-md text-white placeholder-slate-300 focus:ring-4 focus:ring-primary-500/50 outline-none text-lg shadow-2xl transition-all"
              placeholder="Search components, modules, tags..."
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-semibold rounded-xl px-6 hover:shadow-lg hover:shadow-primary-500/30 transition-all hidden md:block">
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-300">
            <span className="font-medium mr-2">Popular:</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">React Navbars</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">Auth Boilerplates</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">Tailwind Cards</span>
          </div>
        </div>
      </div>

      {/* Feature stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="card p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex items-center justify-center mr-4">
            <Layers size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">10,000+</h4>
            <p className="text-sm text-slate-500">Reusable Components</p>
          </div>
        </div>
        <div className="card p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 flex items-center justify-center mr-4">
            <User size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">50k+</h4>
            <p className="text-sm text-slate-500">Active Developers</p>
          </div>
        </div>
        <div className="card p-6 flex items-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center justify-center mr-4">
            <Code size={24} />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white">100%</h4>
            <p className="text-sm text-slate-500">Open Source Friendly</p>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Trending This Week</h2>
            <p className="text-slate-500 dark:text-slate-400">Discover the most downloaded production-ready components.</p>
          </div>
          <Link to="/components" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline hidden sm:block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TrendingComponentCard
            title="Advanced Data Table"
            category="React UI"
            author="DevStudio"
            downloads="12,450"
            rating="4.9"
          />
          <TrendingComponentCard
            title="Express JWT Boilerplate"
            category="Backend API"
            author="BackendGuru"
            downloads="8,300"
            rating="4.8"
          />
          <TrendingComponentCard
            title="Tailwind Admin Dashboard"
            category="Templates"
            author="UIWizard"
            downloads="21,100"
            rating="5.0"
          />
          <TrendingComponentCard
            title="AWS S3 Upload Hook"
            category="React Hooks"
            author="CloudDev"
            downloads="5,230"
            rating="4.7"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
