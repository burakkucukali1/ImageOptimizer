const express = require('express');
const router = express.Router();

const optimizerController = require('./controllers')

// ROUTES
router.get('/', optimizerController.getIndex);

router.post('/optimizeImg', optimizerController.postImage);

module.exports = router;