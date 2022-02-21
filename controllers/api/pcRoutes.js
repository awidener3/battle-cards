const router = require('express').Router();
const { Pc } = require('../../models');

//* api/pc

// Create new PC
router.post('/', async (req, res) => {
	try {
		const newPc = await Pc.create({
			...req.body,
		});

		res.status(200).json(newPc);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
