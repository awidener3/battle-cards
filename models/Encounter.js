const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Encounter extends Model {}

Encounter.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		pc_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'pc',
				key: 'id',
			},
		},
		monster_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'monster',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		underscored: true,
		freezeTableName: true,
		modelName: 'encounter',
	}
);

module.exports = Encounter;
