const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const runValidation = require('../middlewares/runValidation');
const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewsController');

const router = express.Router();

// POST /api/books/:id/reviews
router.post(
  '/books/:id/reviews',
  auth,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5 required'),
    body('comment').optional().isString()
  ],
  runValidation,
  addReview
);

// PUT /api/reviews/:id
router.put(
  '/reviews/:id',
  auth,
  [
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('comment').optional().isString()
  ],
  runValidation,
  updateReview
);

// DELETE /api/reviews/:id
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;
