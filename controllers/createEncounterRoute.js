const router = require('express').Router();
const { Pc } = require('../models');

// Get all saved PC's
router.get('/select-pc', async (req, res) => {
	const pcData = await Pc.findAll();
	// serialize data
	const pcs = pcData.map((pc) => pc.get({ plain: true }));

	res.render('select-pc', {
		pcs,
	});
});

module.exports = router;
