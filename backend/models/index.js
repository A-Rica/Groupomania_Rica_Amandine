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
db.messages = require("./message")(sequelize, Sequelize);
db.commentaire = require("./commentaire")(sequelize, Sequelize);

db.user.hasMany(db.messages, { as: "messages" });
db.messages.belongsTo(db.user, {
  foreignKey: {field: "userId",
  allowNull: false
}, 
  as: "user",
  onDelete: "cascade"
});


module.exports = db; 
