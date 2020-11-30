const express = require('express');
const router = express.Router();

//ADD ROUTES IN API
router.use('/api', require('./api'));

module.exports = router;