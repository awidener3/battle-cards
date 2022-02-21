const router = require('express').Router();
const { Pc, Monster } = require('../models');

//* /create-encounter

// Render select-pc endpoint
router.get('/select-pc', async (req, res) => {
	const pcData = await Pc.findAll();
	// serialize data
	const pcs = pcData.map((pc) => pc.get({ plain: true }));

	res.render('select-pc', {
		pcs,
	});
});

// Render select-monsters endpoint
router.get('/select-monster', async (req, res) => {
	const monsterData = await Monster.findAll();
	// serialize data
	const monsters = monsterData.map((monster) => monster.get({ plain: true }));

	res.render('select-monster', {
		monsters,
	});
});

module.exports = router;
