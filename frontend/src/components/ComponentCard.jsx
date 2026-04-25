import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ComponentCard = ({ component }) => {
  return (
    <div className="card group flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/components/${component._id}`} className="block relative overflow-hidden h-48 border-b border-slate-200 dark:border-slate-800">
        {component.screenshots && component.screenshots.length > 0 ? (
          <img 
            src={component.screenshots[0].startsWith('http') ? component.screenshots[0] : `http://localhost:5000${component.screenshots[0]}`} 
            alt={component.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://placehold.co/600x400/1e293b/a21caf?text=Preview+Not+Available' }}
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex justify-center items-center text-slate-400">
            No Preview Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between items-center">
            <span className="text-white text-sm font-medium">View Component</span>
            <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded-md">
            {component.category}
          </span>
          <div className="flex items-center text-amber-500">
            <Star size={14} className="fill-current mr-1" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {component.averageRating ? component.averageRating.toFixed(1) : 'New'}
            </span>
          </div>
        </div>
        
        <Link to={`/components/${component._id}`}>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {component.title}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {component.description}
        </p>
        
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold mr-2">
              {component.author?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[80px]">
              {component.author?.username || 'Unknown'}
            </span>
          </div>
          
          <div className="flex space-x-3 text-xs text-slate-500">
            <span className="flex items-center" title="Downloads">
              <Download size={14} className="mr-1" /> {component.downloads}
            </span>
            <span className="flex items-center" title="Uploaded">
              <Clock size={14} className="mr-1" /> {formatDistanceToNow(new Date(component.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import this inside the file so we can use ArrowRight in the overlay
import { ArrowRight } from 'lucide-react';

export default ComponentCard;
