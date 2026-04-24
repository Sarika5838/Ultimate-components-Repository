const Component = require('../models/Component');
const Review = require('../models/Review');
const fs = require('fs');

// @desc    Fetch all components (with basic search/filter)
// @route   GET /api/components
// @access  Public
const getComponents = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    const technology = req.query.technology ? { technology: req.query.technology } : {};

    const components = await Component.find({ ...keyword, ...category, ...technology })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single component
// @route   GET /api/components/:id
// @access  Public
const getComponentById = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'username avatar' }
      });

    if (component) {
      res.json(component);
    } else {
      res.status(404).json({ message: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload new component
// @route   POST /api/components
// @access  Private
const uploadComponent = async (req, res) => {
  try {
    const {
      title, description, technology, category, tags,
      documentation, setupInstructions, dependencies,
      githubLink, liveDemoLink, currentVersion, changelog
    } = req.body;

    const screenshots = req.files['screenshots'] ? req.files['screenshots'].map(f => `/uploads/screenshots/${f.filename}`) : [];
    const zipFileUrl = req.files['zipFile'] ? `/uploads/zips/${req.files['zipFile'][0].filename}` : '';

    if (screenshots.length === 0 || !zipFileUrl) {
      return res.status(400).json({ message: 'Please upload screenshots and a ZIP file' });
    }

    const component = new Component({
      title,
      description,
      technology,
      category,
      tags: tags ? JSON.parse(tags) : [],
      documentation,
      setupInstructions,
      dependencies: dependencies ? JSON.parse(dependencies) : [],
      githubLink,
      liveDemoLink,
      screenshots,
      author: req.user._id,
      currentVersion: currentVersion || '1.0.0',
      versions: [
        {
          versionNumber: currentVersion || '1.0.0',
          changelog: changelog || 'Initial release',
          fileUrl: zipFileUrl
        }
      ]
    });

    const createdComponent = await component.save();
    res.status(201).json(createdComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a component
// @route   PUT /api/components/:id
// @access  Private
const updateComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (component) {
      // Check author
      if (component.author.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'User not authorized to update this component' });
      }

      component.title = req.body.title || component.title;
      component.description = req.body.description || component.description;
      component.technology = req.body.technology || component.technology;
      component.category = req.body.category || component.category;
      
      const updatedComponent = await component.save();
      res.json(updatedComponent);
    } else {
      res.status(404).json({ message: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a component
// @route   DELETE /api/components/:id
// @access  Private
const deleteComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (component) {
      // Check author
      if (component.author.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'User not authorized to delete this component' });
      }

      await Component.deleteOne({ _id: component._id });
      res.json({ message: 'Component removed' });
    } else {
      res.status(404).json({ message: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/components/:id/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { rating, text, title } = req.body;
    const componentId = req.params.id;

    const component = await Component.findById(componentId);

    if (component) {
      const alreadyReviewed = await Review.findOne({ user: req.user._id, component: componentId });

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Component already reviewed' });
      }

      const review = await Review.create({
        title,
        text,
        rating: Number(rating),
        user: req.user._id,
        component: componentId
      });

      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Download component zip
// @route   GET /api/components/:id/download
// @access  Public
const downloadComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (component) {
      component.downloads += 1;
      await component.save();
      
      const fileUrl = component.versions[0] ? component.versions[0].fileUrl : null;
      if (fileUrl) {
         res.json({ fileUrl });
      } else {
         res.status(404).json({ message: 'File not found for component' });
      }
    } else {
      res.status(404).json({ message: 'Component not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getComponents,
  getComponentById,
  uploadComponent,
  updateComponent,
  deleteComponent,
  createReview,
  downloadComponent
};
