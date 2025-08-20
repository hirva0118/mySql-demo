import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize.js";

class Post extends Model {
  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // table name, not model name
        key: "id", // column in that table,PK in users
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
  }
);

export default Post;
