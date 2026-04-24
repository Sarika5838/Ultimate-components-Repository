const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  versionNumber: {
    type: String,
    required: true,
  },
  changelog: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const componentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a component title'],
    trim: true,
    maxlength: [100, 'Title can not be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description can not be more than 1000 characters']
  },
  technology: {
    type: String,
    required: [true, 'Please specify the main technology (e.g., React, Node.js)'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category (e.g., UI, Utility, API)'],
  },
  tags: {
    type: [String],
    required: true
  },
  documentation: {
    type: String,
    required: [true, 'Please provide documentation']
  },
  setupInstructions: {
    type: String,
    required: [true, 'Please provide setup instructions']
  },
  dependencies: {
    type: [String],
  },
  screenshots: {
    type: [String],
    required: true
  },
  githubLink: {
    type: String,
    match: [
      /https?:\/\/(www\.)?github\.com\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/[-a-zA-Z0-9()@:%_\+.~#?&//=]*/,
      'Please use a valid GitHub URL'
    ]
  },
  liveDemoLink: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  versions: [versionSchema],
  currentVersion: {
    type: String,
    default: '1.0.0'
  },
  downloads: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5']
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals
componentSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'component',
  justOne: false
});

module.exports = mongoose.model('Component', componentSchema);
