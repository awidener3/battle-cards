const Pc = require('./Pc');
const Monster = require('./Monster');
const User = require('./User');
const Encounter = require('./Encounter');

User.hasMany(Pc, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Pc.belongsTo(User, {
	foreignKey: 'user_id',
});

User.hasMany(Encounter, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

Encounter.belongsTo(User, {
	foreignKey: 'user_id',
});

module.exports = { Pc, Monster };
