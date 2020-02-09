const router = require('express').Router();

// get request
router.route('/').get((req, res) => {
    res.send('Welcome to exercise tracker app!')
});

module.exports = router;

