const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const createEncounterRoutes = require('./createEncounterRoute');

// GET route for '/' -> index.html

router.use('/', homeRoutes);
router.use('/create-encounter', createEncounterRoutes);
router.use('/api', apiRoutes);

module.exports = router;
