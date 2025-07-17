const express = require('express');
const router = express.Router();
const {markAsCompleted, getProgress} = require('../controllers/progressController');

// POST: Mark course as completed
router.post('/mark-completed', markAsCompleted);

// GET: Get course progress
router.get('/:userId/:courseId', getProgress);

module.exports = router;
