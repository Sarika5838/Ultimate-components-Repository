const express = require('express');
const router = express.Router();
const {
  getComponents,
  getComponentById,
  uploadComponent,
  updateComponent,
  deleteComponent,
  createReview,
  downloadComponent
} = require('../controllers/componentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getComponents)
  .post(protect, upload.fields([
    { name: 'screenshots', maxCount: 5 }
  ]), uploadComponent);

router.route('/:id')
  .get(getComponentById)
  .put(protect, updateComponent)
  .delete(protect, deleteComponent);

router.post('/:id/reviews', protect, createReview);
router.get('/:id/download', downloadComponent);

module.exports = router;
