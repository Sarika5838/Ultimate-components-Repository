import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../api/axiosConfig';
import { UploadCloud, Image as ImageIcon, FileArchive, CheckCircle, XCircle } from 'lucide-react';
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
    screenshots: [],
    zipFile: null
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
    } else {
      setFiles({ ...files, zipFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'tags' || key === 'dependencies') {
          // simple comma separated to JSON array
          const arr = formData[key].split(',').map(s => s.trim()).filter(s => s);
          data.append(key, JSON.stringify(arr));
        } else {
          data.append(key, formData[key]);
        }
      });

      files.screenshots.forEach(file => {
        data.append('screenshots', file);
      });

      if (files.zipFile) {
        data.append('zipFile', files.zipFile);
      } else {
        throw new Error("ZIP File is required");
      }

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Source Code (ZIP / Rar) <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative">
                  <FileArchive className="h-10 w-10 text-primary-500 mb-3" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload ZIP</p>
                  <p className="text-xs text-slate-500 mt-1">{files.zipFile ? files.zipFile.name : 'Max 50MB'}</p>
                  <input type="file" name="zipFile" accept=".zip,.rar,.7z" onChange={handleFileChange} required className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Screenshots (Up to 5) <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative">
                  <ImageIcon className="h-10 w-10 text-primary-500 mb-3" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload images</p>
                  <p className="text-xs text-slate-500 mt-1">{files.screenshots.length > 0 ? `${files.screenshots.length} file(s) selected` : 'JPG, PNG, WebP'}</p>
                  <input type="file" name="screenshots" multiple accept="image/*" onChange={handleFileChange} required className="absolute inset-0 opacity-0 cursor-pointer" />
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
