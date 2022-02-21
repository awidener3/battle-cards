const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const createEncounterRoutes = require('./createEncounterRoute');

// GET route for '/' -> index.html

router.use('/', homeRoutes);
router.use('/create-encounter', createEncounterRoutes);

module.exports = router;
