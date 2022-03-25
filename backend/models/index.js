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
db.message = require("./message")(sequelize, Sequelize);
db.comment= require("./comment")(sequelize, Sequelize);

db.user.hasMany(db.message, { as: "message" });
db.user.hasMany(db.comment, { as: "comment" });
db.message.hasMany(db.comment, { as: "comment" });
db.message.belongsTo(db.user, {
  foreignKey: {field: "userId",
  allowNull: false
}, 
  as: "user",
  onDelete: "cascade"
});
db.comment.belongsTo(db.message, {
  foreignKey: {field: "messageId",
  allowNull: false 
},  
  as: "message",
  onDelete: "cascade"
});
db.comment.belongsTo(db.user, {
  foreignKey: {field: "userId",
  allowNull: false
}, 
  as: "user",
  onDelete: "cascade"
});


module.exports = db; 
