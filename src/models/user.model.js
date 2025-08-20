import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize.js";

class User extends Model {
  static associate(models) {
    User.hasMany(models.post,{
      foreignKey:"userId",
      as:"posts",
    })
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
