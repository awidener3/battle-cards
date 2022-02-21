const sequelize = require('../config/connection');
const { Pc, Monster } = require('../models');

const pcData = require('./pc.json');
const monsterData = require('./monster.json');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	const pcs = await Pc.bulkCreate(pcData, {
		individualHooks: true,
		returning: true,
	});

	const monsters = await Monster.bulkCreate(monsterData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
