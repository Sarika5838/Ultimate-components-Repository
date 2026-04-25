import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Download, Star, Globe, ExternalLink, Calendar, Code, CheckCircle, Tag, Layers } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

const ComponentDetail = () => {
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const { data } = await api.get(`/components/${id}`);
        setComponent(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Component not found');
      } finally {
        setLoading(false);
      }
    };
    fetchComponent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center max-w-2xl mx-auto mt-12 border border-red-200">
        <h2 className="text-2xl font-bold mb-2">Oops!</h2>
        <p>{error || 'Component could not be loaded.'}</p>
        <Link to="/" className="inline-block mt-4 btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header section */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 rounded-full blur-3xl -z-10" />

        <div className="flex-1 mb-6 md:mb-0">
          <div className="flex items-center space-x-3 mb-3">
            <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-sm font-semibold">
              {component.category}
            </span>
            <span className="px-3 py-1 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-lg text-sm font-semibold flex items-center">
              <Code size={14} className="mr-1" /> {component.technology}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
            {component.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg flex items-center">
            by <span className="font-semibold text-slate-700 dark:text-slate-300 ml-1">{component.author?.username}</span>
            <span className="mx-3 text-slate-300 dark:text-slate-700">•</span>
            <Calendar size={16} className="mr-1" /> {format(new Date(component.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {component.liveDemoLink && (
            <a href={component.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center px-6 py-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <ExternalLink size={18} className="mr-2" /> Live Demo
            </a>
          )}
          <a
            href={component.versions && component.versions.length > 0 ? `http://localhost:5000${component.versions[0].fileUrl}` : '#'}
            download
            className="flex justify-center items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all shadow-md group border border-transparent"
          >
            <Download size={18} className="mr-2 group-hover:-translate-y-1 transition-transform" />
            Download ZIP
          </a>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Gallery Preview */}
          <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm relative group">
            {component.screenshots && component.screenshots.length > 0 ? (
              <img
                src={component.screenshots[0].startsWith('http') ? component.screenshots[0] : `http://localhost:5000${component.screenshots[0]}`}
                alt="Component Preview"
                className="w-full aspect-video object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-col">
                <Layers size={48} className="mb-2 opacity-50" />
                No Preview Provided
              </div>
            )}
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex space-x-6">
            {['overview', 'documentation', 'dependencies'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "pb-4 text-sm font-medium border-b-2 transition-colors capitalize",
                  activeTab === tab
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 min-h-[300px]">
            {activeTab === 'overview' && (
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{component.description}</p>

                <h3 className="text-xl font-bold mt-8 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {component.tags?.map((tag, i) => (
                    <span key={i} className="flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                      <Tag size={12} className="mr-1 opacity-50" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documentation' && (
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Documentation & Setup</h3>
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
                    {component.documentation || component.setupInstructions || 'No documentation provided.'}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'dependencies' && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Required Dependencies</h3>
                {component.dependencies && component.dependencies.length > 0 ? (
                  <ul className="space-y-3">
                    {component.dependencies.map((dep, i) => (
                      <li key={i} className="flex items-center text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                        <CheckCircle size={18} className="text-emerald-500 mr-3" />
                        <span className="font-mono text-sm">{dep}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">No external dependencies specified.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Meta Data */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              Component Info
            </h3>

            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Version</span>
                <span className="font-semibold text-slate-900 dark:text-white px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">{component.currentVersion}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Downloads</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                  <Download size={14} className="mr-1 text-primary-500" /> {component.downloads || 0}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Rating</span>
                <span className="font-semibold text-slate-900 dark:text-white flex items-center">
                  <Star size={14} className="mr-1 text-amber-500 fill-amber-500" />
                  {component.averageRating ? component.averageRating.toFixed(1) : 'No ratings'}
                </span>
              </li>
              {component.githubLink && (
                <li className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                  <a href={component.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                    <Globe size={18} className="mr-2" /> View Source Code
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="card p-6 bg-gradient-to-br from-primary-500/10 to-indigo-500/10 border-primary-500/20">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Want to contribute?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Connect with the author or fork the project on GitHub to suggest improvements.</p>
            <button className="w-full py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm">
              Contact Author
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComponentDetail;
