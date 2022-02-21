const database = require('mime-db');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Monster extends Model {}

Monster.init(
	{
		slug: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		size: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.STRING,
		},
		subtype: {
			type: DataTypes.STRING,
		},
		alignment: {
			type: DataTypes.STRING,
		},
		armor_class: {
			type: DataTypes.INTEGER,
		},
		armor_desc: {
			type: DataTypes.STRING,
		},
		hit_points: {
			type: DataTypes.INTEGER,
		},
		hit_dice: {
			type: DataTypes.STRING,
		},
		speed: {
			type: DataTypes.STRING,
		},
		strength: {
			type: DataTypes.INTEGER,
		},
		dexterity: {
			type: DataTypes.INTEGER,
		},
		constitution: {
			type: DataTypes.INTEGER,
		},
		intelligence: {
			type: DataTypes.INTEGER,
		},
		wisdom: {
			type: DataTypes.INTEGER,
		},
		charisma: {
			type: DataTypes.INTEGER,
		},
		strength_save: {
			type: DataTypes.INTEGER,
		},
		dexterity_save: {
			type: DataTypes.INTEGER,
		},
		constitution_save: {
			type: DataTypes.INTEGER,
		},
		intelligence_save: {
			type: DataTypes.INTEGER,
		},
		wisdom_save: {
			type: DataTypes.INTEGER,
		},
		charisma_save: {
			type: DataTypes.INTEGER,
		},
		perception: {
			type: DataTypes.INTEGER,
		},
		skills: {
			type: DataTypes.STRING,
		},
		damage_vulnerabilities: {
			type: DataTypes.STRING,
		},
		damage_resistances: {
			type: DataTypes.STRING,
		},
		damage_immunities: {
			type: DataTypes.STRING,
		},
		condition_immunities: {
			type: DataTypes.STRING,
		},
		senses: {
			type: DataTypes.STRING,
		},
		languages: {
			type: DataTypes.STRING,
		},
		challenge_rating: {
			type: DataTypes.STRING,
		},
		actions: {
			type: DataTypes.TEXT,
		},
		reactions: {
			type: DataTypes.TEXT,
		},
		legendary_desc: {
			type: DataTypes.TEXT,
		},
		legendary_actions: {
			type: DataTypes.TEXT,
		},
		special_abilities: {
			type: DataTypes.TEXT,
		},
		spell_list: {
			type: DataTypes.TEXT,
		},
		img_main: {
			type: DataTypes.STRING,
		},
		hit_points: {
			type: DataTypes.INTEGER,
		},
		document_slug: {
			type: DataTypes.STRING,
		},
		document_title: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		underscored: true,
		freezeTableName: true,
		modelName: 'monster',
	}
);

module.exports = Monster;
