const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('create-encounter');
});

module.exports = router;
