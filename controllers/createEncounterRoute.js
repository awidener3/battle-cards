const router = require('express').Router();

router.get('/select-pc', (req, res) => {
	res.render('select-pc');
});

module.exports = router;
