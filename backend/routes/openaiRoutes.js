const express = require('express');
const router = express.Router();
const { completionsController, chatCompletionsController } = require('../controllers/openaiController');

router.post('/generate', completionsController);
router.post('/chat', chatCompletionsController);

module.exports = router;
