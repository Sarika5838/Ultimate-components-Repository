import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import ComponentCard from '../components/ComponentCard';
import { Layers, Download, Star, Activity, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchUserComponents();
    }
  }, [user, navigate]);

  const fetchUserComponents = async () => {
    try {
      const { data } = await api.get('/components');
      // For this simple example, we just filter client side or assume a query param for user.
      // Ideally, there should be a proper backend route /api/users/components
      const userComps = data.filter(c => c.author?._id === user._id || c.author === user._id || c.author?.username === user.username);
      setComponents(userComps);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mock Data for Charts
  const chartData = [
    { name: 'Mon', downloads: 120 },
    { name: 'Tue', downloads: 200 },
    { name: 'Wed', downloads: 150 },
    { name: 'Thu', downloads: 280 },
    { name: 'Fri', downloads: 220 },
    { name: 'Sat', downloads: 90 },
    { name: 'Sun', downloads: 310 },
  ];

  const totalDownloads = components.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
  const avgRating = components.length > 0 
    ? (components.reduce((acc, curr) => acc + (curr.averageRating || 0), 0) / components.length).toFixed(1)
    : 0;

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back, {user?.username}</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's an overview of your repository activity.</p>
        </div>
        <Link to="/upload" className="btn-primary flex items-center shadow-lg shadow-primary-500/30">
          <Plus size={20} className="mr-2" /> New Component
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Layers size={64} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Components</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{components.length}</h3>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Download size={64} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Downloads</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{totalDownloads}</h3>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-amber-500">
            <Star size={64} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Average Rating</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
              {avgRating} <Star size={20} className="ml-2 text-amber-500 fill-amber-500" />
            </h3>
          </div>
        </div>

        <div className="card p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-primary-500 to-indigo-600 text-white border-transparent">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Activity size={64} />
          </div>
          <div>
            <p className="text-sm font-medium text-primary-100 mb-1">Account Role</p>
            <h3 className="text-3xl font-bold">{user?.role}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Downloads Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="downloads" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Edit Profile</p>
                <p className="text-xs text-slate-500">Update your bio and links</p>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-left border border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Manage Api Keys</p>
                <p className="text-xs text-slate-500">Regenerate access tokens</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* User's Components */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Components</h2>
          <Link to="/components" className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm">
            Manage All
          </Link>
        </div>
        
        {components.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <Layers size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You haven't uploaded any components yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">Start sharing your code with the community today.</p>
            <Link to="/upload" className="btn-primary inline-flex items-center">
              <Plus size={18} className="mr-2" /> Upload Your First Component
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {components.map((component) => (
              <ComponentCard key={component._id} component={component} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
