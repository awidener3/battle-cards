const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pc extends Model {}

Pc.init(
	{
		player_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		character_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		class: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		underscored: true,
		freezeTableName: true,
		modelName: 'pc',
	}
);

module.exports = Pc;
