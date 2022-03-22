const dbConfig = require("../db/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const authJwt = require("../middleware/authJwt");

module.exports = {
  authJwt
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user")(sequelize, Sequelize);
db.messages = require("./post")(sequelize, Sequelize);
db.commentaire = require("./commentaire")(sequelize, Sequelize);

db.user.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.user, {
  foreignKey: {field: "userId",
  allowNull: false
},
  as: "user",
  onDelete: "cascade"
});
db.role = require("../models/role")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db; 
