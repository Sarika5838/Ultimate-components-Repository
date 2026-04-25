import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axiosConfig';
import { UploadCloud, Image as ImageIcon, FileArchive, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import clsx from 'clsx';

const UploadComponent = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'React UI',
    technology: 'React',
    tags: '',
    documentation: '',
    setupInstructions: '',
    dependencies: '',
    githubLink: '',
    liveDemoLink: '',
    currentVersion: '1.0.0',
    changelog: 'Initial release'
  });

  const [files, setFiles] = useState({
    screenshots: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    // Note: useEffect is typically better for side-effects, but this allows hooks to run.
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'screenshots') {
      const selectedFiles = Array.from(e.target.files).slice(0, 5); // Max 5
      setFiles({ ...files, screenshots: selectedFiles });
    }
  };

  const removeScreenshot = (index, e) => {
    if (e) e.preventDefault();
    setFiles(prev => {
      const remaining = prev.screenshots.filter((_, i) => i !== index);
      if (remaining.length === 0) {
        const input = document.getElementById('screenshotsInput');
        if (input) input.value = '';
      }
      return { ...prev, screenshots: remaining };
    });
  };

  const clearScreenshots = (e) => {
    if (e) e.preventDefault();
    setFiles(prev => ({ ...prev, screenshots: [] }));
    const input = document.getElementById('screenshotsInput');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      const finalSetupInstructions = formData.setupInstructions || formData.documentation || 'No additional setup instructions provided.';

      Object.keys(formData).forEach(key => {
        if (key === 'tags' || key === 'dependencies') {
          // simple comma separated to JSON array
          const arr = formData[key].split(',').map(s => s.trim()).filter(s => s);
          data.append(key, JSON.stringify(arr));
        } else if (key === 'setupInstructions') {
          data.append(key, finalSetupInstructions);
        } else {
          data.append(key, formData[key]);
        }
      });

      files.screenshots.forEach(file => {
        data.append('screenshots', file);
      });

      const response = await api.post('/components', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Component uploaded successfully!');
      setTimeout(() => navigate(`/components/${response.data._id}`), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Error uploading component');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Upload New Component</h1>
        <p className="text-slate-500 dark:text-slate-400">Share your reusable code with the community</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
          <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center text-emerald-700 dark:text-emerald-400">
          <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Component Title <span className="text-red-500">*</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="input" placeholder="e.g. Modern Glassmorphism Navbar" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="input" placeholder="Briefly describe what this component does..."></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category <span className="text-red-500">*</span></label>
              <select name="category" value={formData.category} onChange={handleInputChange} required className="input h-[42px] appearance-none">
                <option value="React UI">React UI</option>
                <option value="Backend API">Backend API</option>
                <option value="Templates">Templates</option>
                <option value="React Hooks">React Hooks</option>
                <option value="Config Files">Config Files</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Technology <span className="text-red-500">*</span></label>
              <input type="text" name="technology" value={formData.technology} onChange={handleInputChange} required className="input" placeholder="e.g. React, Node.js, Vue" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="input" placeholder="e.g. navbar, glassmorphism, responsive" />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Files & Media</h3>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Screenshots (Up to 5) <span className="text-red-500">*</span></label>
                <div className="border border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      id="screenshotsInput"
                      name="screenshots"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      required={files.screenshots.length === 0}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900/30 dark:file:text-primary-400"
                    />
                    {files.screenshots.length > 0 && (
                      <button
                        type="button"
                        onClick={clearScreenshots}
                        className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors border border-red-200 dark:border-red-800/50"
                        title="Clear Screenshots"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {files.screenshots.length > 0 && (
                    <div className="mt-2 flex flex-col space-y-1">
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{files.screenshots.length} file(s) selected:</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 break-words">
                        {files.screenshots.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Documentation & Links</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Documentation / Setup Instructions <span className="text-red-500">*</span></label>
                <textarea name="documentation" value={formData.documentation} onChange={handleInputChange} required rows="6" className="input font-mono text-sm" placeholder="Markdown supported. Provide clear steps to use this component."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
                  <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="input" placeholder="https://github.com/your/repo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Live Demo URL</label>
                  <input type="url" name="liveDemoLink" value={formData.liveDemoLink} onChange={handleInputChange} className="input" placeholder="https://yourdemo.com" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "btn-primary flex items-center px-8 shadow-lg shadow-primary-500/30",
                isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <><UploadCloud className="mr-2 h-5 w-5" /> Publish Component</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UploadComponent;
