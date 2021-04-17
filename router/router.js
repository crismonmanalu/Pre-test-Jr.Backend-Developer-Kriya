const express = require('express');
const router = express.Router();
const progressBoardController = require('../controllers/progress_board');

router.get('/api/all', progressBoardController.getAll);
router.post('/api/create-progress', progressBoardController.createProgress);
router.post('/api/update-progress', progressBoardController.updateProgress);
router.post('/api/delete-progress', progressBoardController.deleteProgress);

module.exports = router