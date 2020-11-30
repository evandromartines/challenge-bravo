const express = require('express');
const router = express.Router();

//ADD ROUTES API
router.use('/currencies', require('./currencies'));


module.exports = router;