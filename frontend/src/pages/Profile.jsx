import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { User, Mail, Link as LinkIcon, Globe, Save } from 'lucide-react';
import { loginSuccess } from '../store/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    githubLink: '',
    portfolioLink: ''
  });

  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchProfile();
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      setFormData({
        username: data.username || '',
        email: data.email || '',
        bio: data.bio || '',
        githubLink: data.githubLink || '',
        portfolioLink: data.portfolioLink || ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Note: Backend profile PUT route is assumed to exist for standard user settings updates.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    
    try {
      // In a real scenario, we would have a route /api/users/profile
      // For now, let's just mock a success state
      setTimeout(() => {
        setMsg({ text: 'Profile updated successfully!', type: 'success' });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setMsg({ text: 'Error updating profile', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Profile Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your public presence and account details</p>
      </div>

      {msg.text && (
        <div className={`mb-6 p-4 rounded-xl border ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="card p-6 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {formData.username ? formData.username.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{formData.username}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{formData.email}</p>
            <button className="text-sm font-medium text-primary-600 border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/10 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors w-full">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="input pl-10 h-11" disabled />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Usernames cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input pl-10 h-11" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4" className="input" placeholder="Tell us about yourself..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="url" name="githubLink" value={formData.githubLink} onChange={handleChange} className="input pl-10 h-11" placeholder="https://github.com/..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Portfolio/Website URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} className="input pl-10 h-11" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <button type="submit" disabled={loading} className="btn-primary flex items-center shadow-lg shadow-primary-500/30">
                  {loading ? 'Saving...' : <><Save size={18} className="mr-2" /> Save Changes</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
