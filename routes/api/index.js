const express = require('express');
const router = express.Router();

//ADD ROUTES VERSION API
router.use('/v1', require('./v1'));

module.exports = router;