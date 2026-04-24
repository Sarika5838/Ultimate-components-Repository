const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5']
  },
  component: {
    type: mongoose.Schema.ObjectId,
    ref: 'Component',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per component
reviewSchema.index({ component: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (componentId) {
  const obj = await this.aggregate([
    {
      $match: { component: componentId }
    },
    {
      $group: {
        _id: '$component',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Component').findByIdAndUpdate(componentId, {
      averageRating: obj[0] ? obj[0].averageRating : 0
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.component);
});

// Call getAverageRating before remove
reviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.component);
});

module.exports = mongoose.model('Review', reviewSchema);
