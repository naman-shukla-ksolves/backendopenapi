const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

router.post('/generate-text', textController.generateText);

module.exports = router;