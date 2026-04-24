import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import ComponentCard from '../components/ComponentCard';
import { Search as SearchIcon, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';

const Search = () => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    technology: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    setLoading(true);
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (filters.keyword) queryParams.append('keyword', filters.keyword);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.technology) queryParams.append('technology', filters.technology);
      
      const { data } = await api.get(`/components?${queryParams.toString()}`);
      setComponents(data);
    } catch (error) {
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComponents();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div className="w-full md:w-auto flex-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore Components</h1>
          <p className="text-slate-500 dark:text-slate-400">Search through thousands of high-quality, reusable assets.</p>
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-dark-card rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm w-full md:w-auto justify-center"
        >
          <SlidersHorizontal size={18} className="mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Main Search Bar area */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              name="keyword"
              value={filters.keyword}
              onChange={handleFilterChange}
              className="block w-full pl-12 pr-24 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-dark-card text-lg focus:ring-2 focus:ring-primary-500 outline-none shadow-sm dark:shadow-none transition-shadow"
              placeholder="Search components by name..."
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 btn-primary px-6 rounded-xl shadow-md">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
            <select 
              name="category" 
              value={filters.category} 
              onChange={(e) => { handleFilterChange(e); }}
              className="input h-[42px] appearance-none"
            >
              <option value="">All Categories</option>
              <option value="React UI">React UI</option>
              <option value="Backend API">Backend API</option>
              <option value="Templates">Templates</option>
              <option value="React Hooks">React Hooks</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technology</label>
            <select 
              name="technology" 
              value={filters.technology} 
              onChange={(e) => { handleFilterChange(e); }}
              className="input h-[42px] appearance-none"
            >
              <option value="">All Technologies</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={fetchComponents}
              className="w-full h-[42px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex justify-center items-center"
            >
              <Filter size={18} className="mr-2" /> Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary-500" />
        </div>
      ) : components.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
          <SearchIcon size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No components found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your search terms or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setFilters({keyword: '', category: '', technology: ''}); setTimeout(fetchComponents, 0); }}
            className="mt-6 text-primary-600 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {components.map((component) => (
            <ComponentCard key={component._id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
