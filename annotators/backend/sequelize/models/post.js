"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Post.hasMany(models.Annotation);
			Post.belongsToMany(models.User, {
				through: models.UserPostAllocation,
				foreignKey: "postId",
			});
		}
	}
	Post.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			e_twitter_id: DataTypes.STRING,
			role: DataTypes.ENUM("text", "image", "gif", "video"),
			text: DataTypes.STRING,
			lang: {
				type: DataTypes.STRING,
				defaultValue: "en",
			},
			urls: DataTypes.STRING,
			photos: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
