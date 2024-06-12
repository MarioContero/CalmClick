const express = require('express');
const router = express.Router();
const { getUserScores } = require('../controllers/scoreController');

router.get('/:userId', getUserScores);

module.exports = router;
