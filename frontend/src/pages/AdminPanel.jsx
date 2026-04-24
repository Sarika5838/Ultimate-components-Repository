import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Users, Layers, AlertCircle, Shield, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic protection
    if (!user || user.role !== 'Admin') {
      navigate('/');
    } else {
      fetchAllData();
    }
  }, [user, navigate]);

  const fetchAllData = async () => {
    try {
      // In a real app we'd fetch users and more advanced stats too
      const { data } = await api.get('/components');
      setComponents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this component? This action cannot be undone.")) {
      try {
        await api.delete(`/components/${id}`);
        setComponents(components.filter(c => c._id !== id));
      } catch (err) {
        console.error(err);
        alert('Error deleting component');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Loading admin panel...</div>;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center mb-2">
          <Shield className="mr-3 text-primary-500" size={32} /> 
          Admin Control Center
        </h1>
        <p className="text-slate-500 dark:text-slate-400">System overview and content management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 border-l-4 border-l-primary-500">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg mr-4">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Components</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{components.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="card p-6 border-l-4 border-l-indigo-500">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Registered Users</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Active System</h3>
            </div>
          </div>
        </div>

        <div className="card p-6 border-l-4 border-l-rose-500">
          <div className="flex items-center">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg mr-4">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Reviews</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">0</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manage All Components</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-semibold">Component Info</th>
                <th className="p-4 font-semibold">Author</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {components.map((comp) => (
                <tr key={comp._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">{comp.title}</p>
                    <p className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 inline-block rounded">{comp.category}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{comp.author?.username || 'Unknown'}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    {format(new Date(comp.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <CheckCircle size={12} className="mr-1" /> Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(comp._id)}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors" 
                      title="Delete Component"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {components.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No components found in the system.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
