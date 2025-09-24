const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');
const runValidation = require('../middlewares/runValidation');
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks
} = require('../controllers/booksController');

const router = express.Router();

// POST /api/books - add new book
router.post(
  '/books',
  auth,
  [
    body('title').notEmpty().withMessage('Title required'),
    body('author').notEmpty().withMessage('Author required')
  ],
  runValidation,
  addBook
);

// GET /api/books - list all books
router.get('/books', getBooks);

// GET /api/books/:id - get book details including reviews
router.get('/books/:id', getBookById);

// GET /api/search?query=titleOrAuthor - search books
router.get('/search', searchBooks);

module.exports = router;
