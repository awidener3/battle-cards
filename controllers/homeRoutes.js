const router = require('express').Router();

// GET route for '/' -> index.html
router.get('/', (req, res) => {
	res.render('homepage');
});

module.exports = router;
