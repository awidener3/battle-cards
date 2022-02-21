const router = require('express').Router();
const pcRoutes = require('./pcRoutes');
const monsterRoutes = require('./monsterRoutes');

router.use('/pc', pcRoutes);
router.use('/,pmster', monsterRoutes);

module.exports = router;
