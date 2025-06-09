const express = require('express');
const router = express.Router();

// Controllers | Route Handlers
const {aigenerateImage} = require('../controllers/aicontroller');

router.get('/', (req, res) => {
    res.send('Welcome to the AISymphony API');
});
router.post('/generateImg',aigenerateImage);

module.exports = router;